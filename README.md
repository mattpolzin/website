
# Website
The various scripts and source required to build out mattpolzin.com

Currently, that's intentionally a very minimalist site (only a timeline of my interests throughout my career).

## Timeline
I wrote a little script that generates the timeline used for the site; the script could be fun for others, so here's how you'd go about generating your own timeline in the same style after downloading or cloning this repo.

```shell
node timeline.js html < some_file.in > some_file.html
```

This will take a file containing things you want to chart out over time, generate HTML, and dump that HTML into `some_file.html`.

The input file is formatted as any number of similar lines:
```
2017 2020 Cool Thing
^    ^    ^_ Any number of words forming a title for the entry.
|    |______ The end date for the timeline entry.
|___________ The start date for the timeline entry.
```

You can see _my_ input file (`proclevities.in`) in this repository for an example.

You can also output your timeline as plain unicode text if you omit the `html` parameter:
```shell
node timeline.js < some_file.in
```

