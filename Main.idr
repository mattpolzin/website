module Main

import Data.List1
import Data.Nat
import Data.SortedSet
import Data.String

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

abs : (start : Nat) -> (end : Nat) -> String -> Proclevity
abs s e t = Proc s (e `minus` s) t

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

diversion : String
diversion = "⌎-"

diversionLength : Nat
diversionLength = length diversion

conversion : String
conversion = "-⌏"

continuance : String
continuance = "--"

sameTailLength : length Main.conversion === length Main.continuance
sameTailLength = Refl

tailLength : Nat
tailLength = length conversion

||| The number of dashes to use in the timeline for each year.
timelineMultiplier : Nat
timelineMultiplier = 6

data Tail = None | Join | Ongoing

render : (laneSplit : Bool) -> (tail : Tail) -> (offset : Nat) -> (leadup : Nat) -> (leadout : Nat) -> String -> String
render laneSplit tail offset leadup leadout str = indent offset $
                                                        renderLaneSplit
                                                        ++ replicate leadup '-'
                                                        ++ renderedTitle str
                                                        ++ replicate leadout '-'
                                                        ++ renderLaneJoin
  where
    renderLaneSplit : String
    renderLaneSplit = if laneSplit then diversion else ""

    renderLaneJoin : String
    renderLaneJoin = case tail of
                          Ongoing => continuance
                          Join    => conversion
                          None    => ""

||| If diverted, draw indication of split from above line.
renderProclevity : (diverted : Bool) -> (offset : Nat) -> (currentYear : Nat) -> Proclevity -> String
renderProclevity diverted offset currentYear (Proc year duration title) =
  let renderedTitle = renderedTitle title
      offset    = offset * timelineMultiplier
      tails     = (duration * timelineMultiplier) `minus` (length renderedTitle)
      tailStyle = if not (diverted && tails >= (diversionLength + tailLength))
                     then None
                     else if (year + duration) > currentYear
                             then Ongoing
                             else Join
      leadup    = tails `div` 2
      leadout   = tails `minus` leadup
      leadup'   = if not diverted then leadup else leadup `minus` diversionLength
      leadout'  = if not diverted
                     then leadout
                     else leadout `minus` ((diversionLength + tailLength) `minus` (leadup `minus` leadup'))
  in render (diverted && tails >= diversionLength) tailStyle offset leadup' leadout' title

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
||| reaches. If the Proclevity's title and diversion is logner than its duration, the effective
||| end year is later than the (year + duration).
effectiveEndYear : (diverted : Bool) -> Proclevity -> Nat
effectiveEndYear diverted (Proc year duration title) = max ((year + duration) * timelineMultiplier) ((year * timelineMultiplier) + (length $ renderedTitle title) + diversionLen)
  where
    diversionLen : Nat
    diversionLen = if diverted then diversionLength else 0

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

proclevities : SortedSet Proclevity
proclevities =
  fromList [ abs 1989 2024 "Alive"
           , abs 2007 2011 "Student"
           , abs 2010 2019 "iOS Developer"
           , abs 2012 2017 "Co-Founder"
           , abs 2016 2019 "Manager"
           , abs 2016 2024 "Mentor"
           , abs 2017 2020 "Swift Fan"
           , abs 2018 2021 "API Pedant"
           , abs 2019 2024 "Backend Developer"
           , abs 2019 2024 "Elixir Fan"
           , abs 2020 2024 "Idris Enthusiest"
           , abs 2021 2024 "Maven"
           ]

main : IO ()
main = do
  traverse_ printLn $
    renderSequence 2022 proclevities

