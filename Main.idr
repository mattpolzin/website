module Main

import Data.Fuel
import Data.List1
import Data.Nat
import Data.SortedSet
import Data.String
import System
import System.File

record Proclevity where
  constructor Proc
  year : Nat
  duration : Nat
  title : String

Show Proclevity where
  show (Proc year duration title) = """
    year: \{show year}
    duration: \{show duration}
    title: {title}
    """

||| A proclevity between two given years.
abs : (start : Nat) -> (end : Nat) -> String -> Proclevity
abs s e t = Proc s (e `minus` s) t

||| A proclevity from a given year for a given amount of time.
rel : (start : Nat) -> (duration : Nat) -> String -> Proclevity
rel = Proc

Eq Proclevity where
  (Proc y d t) == (Proc y' d' t') =
    y == y' && d == d' && t == t'

Ord Proclevity where
  compare (Proc y d t) (Proc y' d' t') =
    if (not $ y == y') then compare y y'
       else if (not $ d == d') then compare d' d -- duration compared in reverse
               else compare t t'

renderedTitle : String -> String
renderedTitle str = "| \{str} |"

renderedTitleLength : String -> Nat
renderedTitleLength str = length (renderedTitle str)

timeline : Char
timeline = '─'

terminus : String
terminus = "◉─"

||| A compound-symbol representing a divergence of interests.
divergence : String
divergence = "╰─"

sameHeadLength : length Main.terminus === length Main.divergence
sameHeadLength = Refl

headLength : Nat
headLength = length divergence

||| A compound-symbol representing a convergence of interests.
||| Perhaps more generally, the petering out of a particular
||| interest.
convergence : String
convergence = "─◉"

||| A compound-symbol representing the continuation of an interest
||| (through present-day).
continuance : String
continuance = "─┈"

sameTailLength : length Main.convergence === length Main.continuance
sameTailLength = Refl

tailLength : Nat
tailLength = length convergence

||| The number of dashes to use in the timeline for each year.
timelineMultiplier : Nat
timelineMultiplier = 6

namespace Head
  public export
  data Head = None | Diverted | New

  public export
  Eq Head where
    None     == None     = True
    Diverted == Diverted = True
    New      == New      = True
    _ == _ = False


namespace Tail
  public export
  data Tail = None | Join | Ongoing

  public export
  Eq Tail where
    None    == None    = True
    Join    == Join    = True
    Ongoing == Ongoing = True
    _ == _ = False

render : (head : Head) -> (tail : Tail) -> (offset : Nat) -> (leadup : Nat) -> (leadout : Nat) -> String -> String
render head tail offset leadup leadout str = indent offset $
                                               renderLaneSplit
                                               ++ replicate leadup timeline
                                               ++ renderedTitle str
                                               ++ replicate leadout timeline
                                               ++ renderLaneJoin
  where
    renderLaneSplit : String
    renderLaneSplit = case head of
                           Diverted => divergence
                           New      => terminus
                           None     => ""

    renderLaneJoin : String
    renderLaneJoin = case tail of
                          Ongoing => continuance
                          Join    => convergence
                          None    => ""

||| If diverted, draw indication of split from above line.
renderProclevity : (diverted : Bool) -> (offset : Nat) -> (currentYear : Nat) -> Proclevity -> String
renderProclevity diverted offset currentYear (Proc year duration title) =
  let renderedTitle = renderedTitle title
      offset    = offset * timelineMultiplier
      tails     = (duration * timelineMultiplier) `minus` (length renderedTitle)
      headStyle = if tails < headLength
                     then None
                     else if diverted
                             then Diverted
                             else New
      tailStyle = if tails < (headLength + tailLength)
                     then None
                     else if (year + duration) > currentYear
                             then Ongoing
                             else if diverted then Join else None
      leadup    = tails `div` 2
      leadout   = tails `minus` leadup
      leadup'   = if headStyle == None then leadup else leadup `minus` headLength
      leadout'  = if tailStyle == None
                     then leadout
                     else leadout `minus` ((headLength + tailLength) `minus` (leadup `minus` leadup'))
  in render headStyle tailStyle offset leadup' leadout' title

record Lane where
  constructor MkLane
  show : String
  ||| A lane's effective max year is how far along the timeline the lane's shown text
  ||| reaches. If the lane's last item has a longer title than its duration, the effective
  ||| max year is later than the max year.
  effectiveMaxYear : Nat

length : Lane -> Nat
length = length . show

Show Lane where
  show = Lane.show

||| A Proclevity's effective end year is how far along the timeline the Proclevity's shown text
||| reaches. If the Proclevity's title and divergence is longer than its duration, the effective
||| end year is later than the (year + duration).
effectiveEndYear : (diverted : Bool) -> Proclevity -> Nat
effectiveEndYear diverted (Proc year duration title) = max ((year + duration) * timelineMultiplier) ((year * timelineMultiplier) + (length $ renderedTitle title) + divergenceLen)
  where
    divergenceLen : Nat
    divergenceLen = if diverted then headLength else 0

||| Render a sequence of pre-sorted proclevities.
||| The current year is used to determine a point past which entries
||| have no right-bound (they are ongoing).
renderSequence : (currentYear : Nat) -> SortedSet Proclevity -> List Lane
renderSequence currentYear set with (SortedSet.toList set)
  _ | [] = []
  _ | (x :: xs) = foldl (renderToNextLane False x.year) [] (x :: xs)
  where
    ||| render to the lane represented by the given String if possible.
    ||| If doing so would result in a collision between the previous and current
    ||| proclevity, return @Nothing@.
    renderToLane : (diverted : Bool) -> (minimum : Nat) -> Proclevity -> Lane -> Maybe Lane
    renderToLane diverted minimum p lane = 
      if (p.year * timelineMultiplier) > lane.effectiveMaxYear
         then Just $ MkLane (lane.show ++ renderProclevity diverted ((p.year `minus` minimum) `minus` ((length lane) `div` timelineMultiplier)) currentYear p) (effectiveEndYear diverted p)
         else Nothing

    renderToNextLane : (diverted : Bool) -> (minimum : Nat) -> List Lane -> Proclevity -> List Lane
    renderToNextLane diverted minimum [] p = MkLane (renderProclevity diverted (p.year `minus` minimum) currentYear p) (effectiveEndYear diverted p) :: []
    renderToNextLane diverted minimum (y :: xs) p = maybe (y :: renderToNextLane True minimum xs p) (:: xs) (renderToLane diverted minimum p y)

now : Nat
now = 2022

data Output = Terminal | HTML

parseArgs : List String -> Output
parseArgs ("html" :: xs) = HTML
parseArgs (_ :: xs) = parseArgs xs
parseArgs _ = Terminal

printToTerminal : HasIO io => SortedSet Proclevity -> io ()
printToTerminal ps =
  traverse_ printLn $
    renderSequence now ps

printToHTML : HasIO io => SortedSet Proclevity -> io ()
printToHTML ps =
  let str = concat . intersperse "<br/>" $ Prelude.show <$> (renderSequence now ps)
  in putStrLn """
  <html style="font-family: Monospace; height: 100%; overflow: hidden;">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@latest/css/pico.classless.min.css">
  </head>
  <body style="height: 100%;">
    <div style="white-space: pre; line-height: 2em; padding: 2em; overflow-x: scroll; height: 100%;">\{str}</div>
  </body>
  </html>
  """

readIn : HasIO io => Fuel -> io (List Proclevity)
readIn Dry = pure []
readIn (More fuel) = do
    Just p <- read
      | _ => pure []
    pure (p :: !(readIn fuel))
  where
    read : io (Maybe Proclevity)
    read = do
      Right line <- fGetLine stdin
        | _ => pure Nothing
      let start ::: end :: title  = split (== ' ') line
        | _ => pure Nothing
      let (Just startYear) = parsePositive start
        | _ => pure Nothing
      let (Just endYear)   = parsePositive end
        | _ => pure Nothing
      pure $ Just (abs startYear endYear (fst . break (== '\n') $ concat title))

main : IO ()
main = do
  args <- drop 1 <$> getArgs
  printLn args
  let output = parseArgs args
  input <- readIn (limit 50)
  let proclevities = fromList input
  case output of
       Terminal => printToTerminal proclevities
       HTML     => printToHTML proclevities

