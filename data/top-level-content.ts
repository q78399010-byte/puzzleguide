import { games, type Game } from "@/data/games";
import { levels, type LevelGuide } from "@/data/levels";
import { routes } from "@/lib/routes";

export type TopManualLevelContent = {
  title: string;
  metaDescription: string;
  heroDescription?: string;
  goal?: string;
  introduction: string;
  whyPlayersGetStuck: string;
  beforeYouStart: string;
  steps: string[];
  proTips: string[];
  commonMistakes: string[];
  alternativeStrategy: string;
  relatedLevels: {
    label: string;
    href?: string;
  }[];
  relatedGames: {
    name: string;
    slug: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
};

type PlayProfile = {
  unit: string;
  units: string;
  board: string;
  lane: string;
  buffer: string;
  edge: string;
  center: string;
  blocker: string;
  hiddenPattern: string;
  lockedUnit: string;
  cleanup: string;
  quickClear: string;
  side: string;
  pressure: string;
  firstMove: string;
};

const topLevelLimit = 100;

const defaultRelatedGameSlugs = [
  "color-wood-jam",
  "screw-jam",
  "water-sort",
  "block-blast",
  "parking-jam"
];

const topLevelKeys = new Set(
  [...levels]
    .sort((levelA, levelB) => levelB.views - levelA.views)
    .slice(0, topLevelLimit)
    .map((level) => contentKey(level.gameSlug, level.levelSlug))
);

export const topLevelManualContentKeys = [...topLevelKeys];

const categoryProfiles: Record<string, PlayProfile> = {
  "wood-puzzle": {
    unit: "block",
    units: "blocks",
    board: "wood board",
    lane: "slide lane",
    buffer: "side pocket",
    edge: "outer row",
    center: "middle stack",
    blocker: "large blocker",
    hiddenPattern: "color pattern",
    lockedUnit: "boxed-in block",
    cleanup: "last color group",
    quickClear: "easy match",
    side: "right side",
    pressure: "the board gets tight quickly once the center starts filling",
    firstMove: "the block that opens two lanes"
  },
  sorting: {
    unit: "group",
    units: "groups",
    board: "sorting board",
    lane: "empty container",
    buffer: "spare slot",
    edge: "outer stack",
    center: "middle area",
    blocker: "mixed stack",
    hiddenPattern: "buried color order",
    lockedUnit: "rare color group",
    cleanup: "final merge",
    quickClear: "small transfer",
    side: "right side",
    pressure: "empty space disappears faster than it looks",
    firstMove: "the transfer that creates a clean spare slot"
  },
  mechanical: {
    unit: "piece",
    units: "pieces",
    board: "mechanical board",
    lane: "open path",
    buffer: "free slot",
    edge: "outside lane",
    center: "center chain",
    blocker: "hidden lock",
    hiddenPattern: "release order",
    lockedUnit: "locked piece",
    cleanup: "final chain",
    quickClear: "obvious release",
    side: "right side",
    pressure: "one early release can block the next two moves",
    firstMove: "the outside move that opens a path"
  },
  block: {
    unit: "shape",
    units: "shapes",
    board: "board",
    lane: "open lane",
    buffer: "spare pocket",
    edge: "outer edge",
    center: "center space",
    blocker: "awkward shape",
    hiddenPattern: "fit pattern",
    lockedUnit: "boxed-in shape",
    cleanup: "last placement",
    quickClear: "single clear",
    side: "right side",
    pressure: "the board can split into small pockets",
    firstMove: "the placement that keeps the center open"
  }
};

const profileOverrides: Record<string, Partial<PlayProfile>> = {
  "ball-sort-puzzle": {
    unit: "ball group",
    units: "ball groups",
    board: "tube layout",
    lane: "empty tube",
    hiddenPattern: "buried color order",
    quickClear: "top-color pour"
  },
  "water-sort": {
    unit: "color layer",
    units: "color layers",
    board: "bottle layout",
    lane: "empty bottle",
    hiddenPattern: "buried color stack",
    quickClear: "short pour"
  },
  "goods-sort": {
    unit: "item group",
    units: "item groups",
    board: "shelf layout",
    lane: "open shelf",
    hiddenPattern: "shelf pattern",
    quickClear: "small shelf match"
  },
  "cube-sort": {
    unit: "cube stack",
    units: "cube stacks",
    board: "cube board",
    lane: "open stack",
    hiddenPattern: "buried cube color"
  },
  "screw-jam": {
    unit: "screw",
    units: "screws",
    board: "panel layout",
    lane: "clear panel lane",
    blocker: "overlapping panel",
    lockedUnit: "locked screw",
    quickClear: "visible screw"
  },
  "wood-nuts-and-bolts": {
    unit: "bolt",
    units: "bolts",
    board: "wood panel",
    lane: "clear plate lane",
    blocker: "crossed plate",
    lockedUnit: "locked bolt"
  },
  "nuts-and-bolts": {
    unit: "bolt",
    units: "bolts",
    board: "plate layout",
    lane: "plate lane",
    blocker: "overlapping plate",
    lockedUnit: "locked bolt"
  },
  "pull-the-pin": {
    unit: "pin",
    units: "pins",
    board: "pin layout",
    lane: "safe path",
    blocker: "hazard gate",
    lockedUnit: "risky pin"
  },
  "pin-rescue": {
    unit: "pin",
    units: "pins",
    board: "rescue layout",
    lane: "safe path",
    blocker: "hazard gate",
    lockedUnit: "trap pin"
  },
  "parking-jam": {
    unit: "car",
    units: "cars",
    board: "parking lot",
    lane: "exit lane",
    buffer: "clear bay",
    blocker: "cross car",
    hiddenPattern: "traffic order",
    quickClear: "easy exit"
  },
  "traffic-escape": {
    unit: "car",
    units: "cars",
    board: "traffic grid",
    lane: "exit lane",
    blocker: "cross traffic",
    hiddenPattern: "route order"
  },
  "bus-jam": {
    unit: "bus group",
    units: "bus groups",
    board: "bus queue",
    lane: "loading lane",
    buffer: "open stop",
    blocker: "mixed queue",
    hiddenPattern: "passenger order"
  },
  "tile-match": {
    unit: "tile",
    units: "tiles",
    board: "tile board",
    lane: "tray slot",
    buffer: "empty tray space",
    blocker: "covered tile",
    hiddenPattern: "layer pattern",
    quickClear: "visible match"
  },
  "match-tile-3d": {
    unit: "object",
    units: "objects",
    board: "3D object pile",
    lane: "tray slot",
    buffer: "empty tray space",
    blocker: "hidden object",
    hiddenPattern: "object layer"
  },
  "triple-match": {
    unit: "object set",
    units: "object sets",
    board: "matching board",
    lane: "tray slot",
    buffer: "empty tray space",
    blocker: "covered set",
    hiddenPattern: "set order"
  },
  "mahjong-match": {
    unit: "tile",
    units: "tiles",
    board: "mahjong layout",
    lane: "open tile path",
    blocker: "covered tile",
    hiddenPattern: "layer order"
  },
  "word-connect": {
    unit: "letter path",
    units: "letter paths",
    board: "letter board",
    lane: "word route",
    buffer: "unused clue",
    edge: "short word area",
    center: "main letter cluster",
    blocker: "missing bridge",
    hiddenPattern: "letter pattern",
    lockedUnit: "awkward letter pair",
    cleanup: "last word group",
    quickClear: "short word",
    side: "right side",
    pressure: "the obvious word can leave the longer answer hidden",
    firstMove: "the letter path that reveals two possible words"
  },
  "brain-test": {
    unit: "clue",
    units: "clues",
    board: "puzzle scene",
    lane: "safe action",
    buffer: "unused clue",
    edge: "outer clue",
    center: "main trick",
    blocker: "misleading object",
    hiddenPattern: "trick pattern",
    lockedUnit: "hidden clue",
    cleanup: "final trick",
    quickClear: "obvious tap",
    side: "right side",
    pressure: "the screen looks simple, but the wrong tap can hide the real clue",
    firstMove: "the action that reveals the trick"
  }
};

function contentKey(gameSlug: string, levelSlug: string) {
  return `${gameSlug}/${levelSlug}`;
}

const featuredLevelManualContentByPath: Record<string, TopManualLevelContent> = {
  "color-wood-jam/level-245": {
    title: "Color Wood Jam Level 245 Walkthrough & Solution",
    metaDescription:
      "Color Wood Jam Level 245 walkthrough and solution with practical tips, safe move order, and common mistakes to avoid when the board gets tight.",
    heroDescription:
      "A safe route for Color Wood Jam Level 245, focused on lane space, color order, and the moves that stop the middle from jamming late.",
    introduction:
      "Stuck on Color Wood Jam Level 245? The board looks open for a few moves, then space disappears fast. The hard part is not spotting matching colors; it is keeping a lane open while blocked wood pieces slide into better order. If you rush the first clear, the center can trap two colors behind the same blocker. Start by reading the side lanes, protect one buffer space, and use each move to make the next color easier to release.",
    goal:
      "Open a side lane, keep one buffer space clear, and delay the center color group until the lower blocked lane has room. The level becomes much safer once the large wood pieces can move without stealing the only open path.",
    whyPlayersGetStuck:
      "Players get stuck because Level 245 uses space as the real trap. A wood piece can look harmless when it slides, but if it lands in the only buffer lane, the next color has no way to turn. Color order matters too. Clearing a small green or yellow piece too early can leave a larger matching block boxed in behind the center stack. The blocked lanes are easy to underestimate because the side looks available until two pieces need it at the same time. Many failed attempts end with one color almost clear and one larger piece stuck sideways. That usually means the opener spent space before the board was ready, not that the final move was impossible.",
    beforeYouStart:
      "Before moving anything, scan the board from the outside in. Check which color group has the largest blocked piece, which lane can stay open as a buffer, which center piece blocks two later moves, and which small piece only looks urgent. Do not tap the nearest match just because it is available. A safer first move opens room on the side or frees a color that was blocking another lane. Leave yourself some room before the center starts moving.",
    steps: [
      "Step 1: Start with the wood piece that opens a side lane, not the piece that gives the quickest match. On Level 245, the side lane is your working space for the rest of the board. Move the piece that frees a second follow-up move, then pause and check whether a larger block can now slide without covering the buffer.",
      "Step 2: Clear the outer color group before you disturb the middle stack. Edge pieces usually have more escape room, so they are safer early. If a red or blue piece can slide out and reveal a buried color, take that setup move. Do not drop a top piece into the center unless it clears soon, because it can steal the lane needed for the next blocked color.",
      "Step 3: Use the buffer lane only for pieces that can move again. A common bad run parks a wood block in the side lane and then discovers it has no matching exit. Move a piece into the buffer only when it helps free a blocker or creates a clean color order. If the piece would just sit there, leave the lane empty.",
      "Step 4: Work the center one color group at a time. Once the side is lighter, move the middle piece that reveals the most hidden order. Avoid clearing two center pieces in a row if the first one does not make space. The center is useful only when it creates a path; if it becomes storage, the lower lane usually gets blocked.",
      "Step 5: Free the larger blocked piece before chasing the last small match. The large piece controls more space and can ruin the ending if it stays sideways. Slide supporting pieces away first, keep the buffer lane open, and move the large block only when its destination is clear. This keeps the final colors from fighting for one narrow route.",
      "Step 6: Finish through the open lane and avoid rushing the last color. Check that every remaining wood piece has a clear slide before you commit. Clear the pieces already aligned with their color order, then use the buffer for the final awkward block. If one side stayed open, the last sequence should feel controlled instead of forced."
    ],
    proTips: [
      "Keep one side lane open until the center is almost solved. That lane is worth more than one fast clear.",
      "Move small pieces only when they improve the route for a larger block.",
      "If two colors need the same lane, clear the color with the larger blocked piece first.",
      "Watch what a slide reveals behind it before making the next move.",
      "If the same piece gets trapped twice, change the opener instead of forcing the ending."
    ],
    commonMistakes: [
      "Using the buffer lane as storage for a piece that cannot clear soon.",
      "Clearing a small match while the larger matching block is still boxed in.",
      "Moving the center stack before the side lane has enough space.",
      "Letting two color groups compete for the same blocked lane.",
      "Saving the widest blocked piece for last, when there is no room left to turn it."
    ],
    alternativeStrategy:
      "If the normal route keeps jamming, try a right-side-first approach. Open the right lane and use it as your only buffer while the left side stays mostly untouched. Clear only the left pieces that reveal a buried color or free the large blocker; leave the rest in place until the right side has room. This route is slower, but it keeps the board easier to read because you are solving one half before pulling the center apart. Once the right side has a stable pocket, move one center piece at a time and use that pocket to rotate awkward blocks. The key is restraint. Do not fill the pocket just because a move is available. Keep it empty until a blocked color truly needs it.",
    relatedLevels: [
      {
        label: "Color Wood Jam Level 233",
        href: routes.level("color-wood-jam", "level-233")
      },
      {
        label: "Color Wood Jam Level 260",
        href: routes.level("color-wood-jam", "level-260")
      },
      {
        label: "Color Wood Jam Level 276",
        href: routes.level("color-wood-jam", "level-276")
      },
      {
        label: "Color Wood Jam Level 291",
        href: routes.level("color-wood-jam", "level-291")
      }
    ],
    relatedGames: [
      { name: "Screw Jam", slug: "screw-jam" },
      { name: "Water Sort", slug: "water-sort" },
      { name: "Block Blast", slug: "block-blast" },
      { name: "Parking Jam", slug: "parking-jam" },
      { name: "Ball Sort Puzzle", slug: "ball-sort-puzzle" }
    ],
    faq: [
      {
        question: "Is Color Wood Jam Level 245 hard?",
        answer:
          "Yes. Level 245 is hard because the board gives you just enough space to make a mistake early. The color matches are visible, but the blocked lanes decide the level. Keep a buffer lane open and treat space as the main resource."
      },
      {
        question: "What should I move first?",
        answer:
          "Move the wood piece that opens a side lane or frees two follow-up moves. Do not start with the nearest color match if it fills your buffer. The safest first move usually creates room for a larger blocked piece."
      },
      {
        question: "Why do I keep getting stuck?",
        answer:
          "You are probably spending the open lane too early. When one color group uses the only buffer, the next blocked piece has nowhere to turn. Restart and watch which lane the trapped piece needed, then protect that lane longer."
      },
      {
        question: "Can I solve it without boosters or hints?",
        answer:
          "Yes. Level 245 does not need a booster if you keep the side lane open and move the center slowly. A restart can help when you learn which color gets trapped, but the solution is mainly about order and space."
      },
      {
        question: "What is the safest strategy?",
        answer:
          "Open the edge, keep one buffer lane, free the larger blocked pieces, then solve the center one color group at a time. This keeps the board readable and prevents the final colors from fighting for one narrow lane."
      },
      {
        question: "What mistake should I avoid?",
        answer:
          "Avoid using the buffer lane as a parking spot. If a piece moves into that lane and cannot clear soon, it blocks the move that would save the ending. Keep the lane open until the center has real room."
      }
    ]
  },
  "screw-jam/level-311": {
    title: "Screw Jam Level 311 Walkthrough & Solution",
    metaDescription:
      "Screw Jam Level 311 walkthrough and solution with panel-order tips, open-lane planning, and common mistakes that block the final screws.",
    heroDescription:
      "A practical Screw Jam Level 311 route for screw order, blocked panels, and keeping one open lane ready for the center sequence.",
    introduction:
      "Stuck on Screw Jam Level 311? The first few screws look inviting, but the board punishes a loose order. The main problem is panel overlap: one removed screw can release a panel into the only open lane, blocking the next two screws. You need to clear space before you chase visible screws. Work from the outside, keep one lane open, and do not touch the center until the released panel has somewhere useful to go.",
    goal:
      "Open an outside lane, remove screws in panel order, and keep the center from filling before the blocked panels can slide away. The ending is safe only if one lane stays available for the final screw releases.",
    whyPlayersGetStuck:
      "Players get stuck because Screw Jam Level 311 makes exposed screws look safer than they are. A visible screw may release a panel that crosses the open lane, and once that lane is blocked, the next screw has no clean exit. The center is also risky because several panels overlap there. If you remove two middle screws too early, the released panels crowd each other and cover the screws you still need. The open lane is the pressure point. It should stay free until the blocked panels have moved, not become storage for the first panel you can release. Corner screws matter more than they first appear because they often unlock the final panel angle.",
    beforeYouStart:
      "Before the first screw, check four things: which outside screw opens the clearest lane, which panel is sitting over another screw, which corner panel can block the ending, and where the released panel will move. Do not tap a screw just because it is visible. If you cannot name the lane the panel will use, wait. The safest opener usually makes the board wider without sending a panel across the center.",
    steps: [
      "Step 1: Remove the outside screw that opens a real lane. Start on the edge where the released panel can move away without crossing the center. This gives you a working path for later panels. If two outside screws are available, choose the one that uncovers another screw or clears a panel direction, not the one that only looks easy.",
      "Step 2: Keep the center screws waiting until the board has room. The middle of Level 311 can turn crowded after one careless release. Clear one more edge or corner screw if the center panel has no open direction. A safer move is the screw that gives a panel somewhere to slide, even if it does not clear the most obvious piece.",
      "Step 3: Read the panel behind each screw before removing it. Some screws hold panels that are covering another screw underneath. Remove them only when the lower panel has a lane ready. If the top panel drops into the open lane and stops, the lower screw becomes useless for several moves. Free space first, then remove the screw.",
      "Step 4: Handle corner screws before they become boxed in. Corners look quiet, but a shifted center panel can cover them late. If a corner panel points toward your open lane, clear it while the lane is still available. Do not wait until the center has filled both sides, because then the corner screw may be visible but blocked by panel direction.",
      "Step 5: Use the open lane to release center panels one at a time. Remove a center screw only when the panel can leave cleanly. After each release, pause and check whether the lane is still open. Avoid back-to-back center screws unless the first panel fully moved away. The goal is to keep panel order clean, not to empty the middle fast.",
      "Step 6: Finish by clearing the screws that protect the last lane. Near the end, one small panel can still block the final route. Clear the screw that keeps the lane open before removing the last visible screw. If the panel behind it has no exit, make a side adjustment first. With one lane preserved, the final screws should clear in order."
    ],
    proTips: [
      "Visible does not mean safe. Always check where the released panel will move.",
      "Keep one open lane unused until the center panels start leaving.",
      "Corner screws are easier early than late, especially if the center panel can cover them.",
      "Remove screws that uncover other screws before removing screws that only shift clutter.",
      "If one panel blocks two screws, solve that panel's exit before touching the screws underneath."
    ],
    commonMistakes: [
      "Removing center screws before any outside lane is open.",
      "Letting a released panel sit across the only open path.",
      "Ignoring corner screws until shifted panels cover their exit angle.",
      "Tapping exposed screws without checking the panel behind them.",
      "Clearing two middle panels in a row and losing the lane needed for cleanup."
    ],
    alternativeStrategy:
      "If the center keeps locking up, solve Level 311 from one edge across. Pick the side with the clearest first lane and remove two outside screws there before touching any center screw. Use that opened lane as a panel exit, then clear the nearest corner while it is still reachable. This delays the middle, but it gives every released panel a predictable direction. Once that side is open, remove only the center screw whose panel can slide into the lane and leave. Do not alternate randomly between sides; that is how both lanes get crowded. The edge-first route is slower, but it keeps the panel order readable and leaves fewer chances for one loose panel to cover the final screw.",
    relatedLevels: [
      {
        label: "Screw Jam Level 294",
        href: routes.level("screw-jam", "level-294")
      },
      {
        label: "Screw Jam Level 333",
        href: routes.level("screw-jam", "level-333")
      },
      {
        label: "Screw Jam Level 349",
        href: routes.level("screw-jam", "level-349")
      },
      {
        label: "Screw Jam Level 365",
        href: routes.level("screw-jam", "level-365")
      }
    ],
    relatedGames: [
      { name: "Color Wood Jam", slug: "color-wood-jam" },
      { name: "Water Sort", slug: "water-sort" },
      { name: "Block Blast", slug: "block-blast" },
      { name: "Parking Jam", slug: "parking-jam" },
      { name: "Ball Sort Puzzle", slug: "ball-sort-puzzle" }
    ],
    faq: [
      {
        question: "Is Screw Jam Level 311 hard?",
        answer:
          "Yes. It is hard because the panels overlap in a way that makes exposed screws misleading. The level gets much easier when you open one outside lane first and remove center screws only after the panel has a clear exit."
      },
      {
        question: "What should I move first?",
        answer:
          "Start with an outside screw that opens a lane without sending a panel across the middle. A good opener should uncover another screw or give a blocked panel a route. Avoid the center if the released panel has nowhere to go."
      },
      {
        question: "Why do I keep getting stuck?",
        answer:
          "Most stuck attempts spend the open lane too early. A released panel sits in the lane, then the next screw cannot clear. Watch the panel behind each screw and keep the lane open until the center begins to empty."
      },
      {
        question: "Can I solve it without boosters or hints?",
        answer:
          "Yes. Boosters are not needed if you keep panel order under control. Use restarts to learn which panel blocks your final lane, then change the screw order so that panel moves away before the center gets crowded."
      },
      {
        question: "What is the safest strategy?",
        answer:
          "The safest strategy is outside lane first, corner check second, center panels third, and final screws last. Before each screw, check where its panel will go. If the panel has no clean exit, make another setup move."
      },
      {
        question: "What mistake should I avoid?",
        answer:
          "Do not remove center screws back to back just because they are visible. If the first panel does not fully leave the lane, the second panel can trap it and cover the screws needed for the final cleanup."
      }
    ]
  },
  "water-sort/level-245": {
    title: "Water Sort Level 245 Walkthrough & Solution",
    metaDescription:
      "Water Sort Level 245 walkthrough and solution with empty-bottle tips, color layer order, and common mistakes that cause late deadlocks.",
    heroDescription:
      "A careful Water Sort Level 245 plan for empty tube timing, buried color layers, and avoiding the pours that waste your last bottle space.",
    introduction:
      "Stuck on Water Sort Level 245? This stage is mostly about timing your empty bottle, not making every matching pour right away. Several colors are layered in a way that tempts you to pour too soon, then the last two tubes have no room to separate. The safe route is to build one clean color, keep an empty tube available, and uncover buried layers only when you already know where the next pour will go.",
    goal:
      "Use one empty bottle as working space, build a clean anchor color, and avoid splitting color layers across too many tubes. Once the buried layers are visible, finish by merging full colors instead of chasing short pours.",
    whyPlayersGetStuck:
      "Players get stuck on Level 245 because the bottle space feels larger than it really is. A pour that matches the top color can still be wrong if it fills the only empty tube or buries a color you need next. Water Sort depends on layer order, and this level hides useful colors under small mixed stacks. If you move those stacks without a destination, you create three half-finished tubes instead of one clean path. Empty tube timing is the main pressure point. Spend it too early and the last color cannot be separated; save it too long and the middle tubes stay locked. The safest attempts use the empty bottle as a tool, not as a permanent storage spot.",
    beforeYouStart:
      "Before pouring, identify one anchor color, the tube with the deepest mixed stack, the safest empty bottle, and the color that appears on top in too many places. Do not pour just because two top layers match. Check whether the pour creates a full color, reveals a buried layer, or keeps the empty tube usable. If it only moves clutter from one bottle to another, wait and look for a cleaner setup.",
    steps: [
      "Step 1: Choose an anchor color and build it first. Pick the color with the clearest top layers and a realistic path to completion. Pour matching layers only when they move toward one clean tube. This gives the board a stable base and prevents the empty bottle from being wasted on random mixed colors before the real bottleneck appears.",
      "Step 2: Keep one empty bottle available after the opener. Use it for a temporary transfer, then try to empty it again within one or two pours. Do not fill it with a color stack that cannot move soon. The empty bottle is what lets you separate buried layers later, so protect it even when a short pour looks useful.",
      "Step 3: Uncover buried color layers slowly. When a mixed bottle has a useful layer underneath, move only the top color that has a clean destination. If the destination tube is not ready, make a setup pour first. Avoid splitting the same color across three tubes, because that creates extra work and can block the final merge.",
      "Step 4: Merge matching colors only when the receiving tube can finish or stay clean. A half-clean tube is fine if it remains useful, but a mixed receiving tube can trap the next layer. After each pour, check whether the emptied space improves the next move. If the pour only hides another color, keep the bottle unchanged.",
      "Step 5: Use the empty tube to break the last mixed stack. Move the top layer into temporary space, free the color underneath, then return the temporary layer to a matching tube. This small rotation is safer than trying to force all colors directly into final bottles. Keep the empty tube cycling rather than filled.",
      "Step 6: Finish by completing full bottles in a calm order. Once two colors are nearly solved, pour them into their clean tubes and leave the mixed leftovers for last. Do not break a finished bottle unless it unlocks the only remaining move. If the empty bottle stayed available, the final colors should separate without a hint."
    ],
    proTips: [
      "Keep the empty bottle useful, not full. It should help you rotate layers more than once.",
      "Build one anchor color before you chase buried colors.",
      "A matching top layer is safe only if the receiving bottle stays clean.",
      "Avoid spreading one color across three tubes unless one tube is about to finish.",
      "When a run fails, note which color had no destination and protect space for it earlier."
    ],
    commonMistakes: [
      "Filling the empty bottle with a stack that cannot move again.",
      "Pouring every matching top color without checking the layer underneath.",
      "Starting too many colors at once and leaving no clean anchor tube.",
      "Breaking a completed bottle to fix a problem created earlier.",
      "Saving the deepest mixed stack for last when there is no space to separate it."
    ],
    alternativeStrategy:
      "If your usual route runs out of tube space, switch to a reverse-cleanup plan. Instead of building the most obvious top color first, look for the color buried under the deepest mixed stack and prepare a destination for it. Use the empty bottle to move the top layer away, expose that buried color, and then merge it with its matching stack. This can feel slower because you may ignore easy top pours for a few moves. The benefit is that you remove the stack causing the real deadlock earlier. Once the buried color has a clean tube, return to a normal anchor-color approach. Keep checking that the empty bottle can be cleared again; if it cannot, the alternate route has turned into storage and needs a restart.",
    relatedLevels: [
      {
        label: "Water Sort Level 238",
        href: routes.level("water-sort", "level-238")
      },
      {
        label: "Water Sort Level 260",
        href: routes.level("water-sort", "level-260")
      },
      {
        label: "Water Sort Level 274",
        href: routes.level("water-sort", "level-274")
      },
      {
        label: "Water Sort Level 288",
        href: routes.level("water-sort", "level-288")
      }
    ],
    relatedGames: [
      { name: "Ball Sort Puzzle", slug: "ball-sort-puzzle" },
      { name: "Color Wood Jam", slug: "color-wood-jam" },
      { name: "Screw Jam", slug: "screw-jam" },
      { name: "Block Blast", slug: "block-blast" },
      { name: "Brain Test", slug: "brain-test" }
    ],
    faq: [
      {
        question: "Is Water Sort Level 245 hard?",
        answer:
          "It is harder than it looks because the empty bottle can disappear before the important layers are separated. The colors are not impossible, but the order matters. Keep one working bottle open and avoid starting too many colors."
      },
      {
        question: "What should I move first?",
        answer:
          "Start with a pour that helps build one clean anchor color or frees a bottle without filling the only empty space. If a matching pour does not reveal a useful layer or keep space available, save it for later."
      },
      {
        question: "Why do I keep getting stuck?",
        answer:
          "You are likely filling the empty bottle too early or spreading one color across too many tubes. Once every tube is partly mixed, the buried layers cannot move. Restart and protect the empty bottle for the deepest stack."
      },
      {
        question: "Can I solve it without boosters or hints?",
        answer:
          "Yes. Level 245 can be solved without boosters if you use the empty bottle carefully. Build one clean color, uncover buried layers with short rotations, and avoid pours that turn the empty bottle into permanent storage."
      },
      {
        question: "What is the safest strategy?",
        answer:
          "Build an anchor color first, keep one empty bottle cycling, then use it to expose buried layers. Complete clean bottles only when the color order is stable. This reduces late deadlocks and keeps every pour useful."
      },
      {
        question: "What mistake should I avoid?",
        answer:
          "Avoid pouring into the empty bottle just because you can. If that stack cannot move again soon, you lose the tool needed to separate the final mixed colors. The empty bottle should stay flexible."
      }
    ]
  },
  "parking-jam/level-465": {
    title: "Parking Jam Level 465 Walkthrough & Solution",
    metaDescription:
      "Parking Jam Level 465 walkthrough and solution with car-order tips, blocked-exit planning, and common mistakes that create traffic jams.",
    heroDescription:
      "A Parking Jam Level 465 route for car order, blocked exits, and keeping the main traffic lane open until the final vehicles can leave.",
    introduction:
      "Stuck on Parking Jam Level 465? The lot looks like it has several exits, but the traffic lanes close quickly if you move cars in the wrong order. The real challenge is deciding which car opens a path and which car only shifts the jam sideways. Start by reading the exits, then clear the vehicles that block more than one lane. Do not rush the center until the exit lane has enough room to handle the next car.",
    goal:
      "Open the main exit lane, move cross cars only when they free another vehicle, and avoid filling the clear bay too early. The level becomes manageable once the center cars can leave without blocking the side lane.",
    whyPlayersGetStuck:
      "Players get stuck because Parking Jam Level 465 has cars that look movable but are not useful yet. A car can leave its spot and still block the exit lane for a more important vehicle. The central traffic lane is the biggest danger: if you send a short car into it too early, the longer car behind it loses its route. Blocked exits also make the level feel unfair because one wrong car can cover the only path for three others. The safe order is usually not the fastest visible exit. It is the order that clears cross traffic, opens a lane, and keeps the clear bay ready for a car that truly needs it.",
    beforeYouStart:
      "Before moving a car, check the main exit, the cross car blocking it, the clear bay you can keep open, and the longest car that needs extra room. Do not move cars just because they can slide. Ask whether the move opens an exit, frees a blocked lane, or protects the clear bay. If it only changes the shape of the jam, leave it alone until a better lane is open.",
    steps: [
      "Step 1: Identify the exit lane that can clear the most cars. Start with the car blocking that lane only if it has somewhere to go without trapping the next vehicle. The safest first move usually opens a path, not a quick exit. After the opener, check whether a cross car can now move away from the center.",
      "Step 2: Move cross cars before center cars. Cross traffic controls the board because it can block several exits at once. Clear the car that releases another lane or gives the long car room to slide. Do not pull a center car forward if it lands in the clear bay and blocks a vehicle that needs that space later.",
      "Step 3: Keep one clear bay available. Treat it as a turning space, not as a parking spot. If a car moves into the bay and cannot leave soon, the lot becomes harder to fix. Use the bay for short rotations: move a car out, clear the blocked lane, then send it through the exit or back into a safer route.",
      "Step 4: Free the longest blocked car before the small cleanup cars. Long vehicles need more room and cause most late jams. Move supporting cars away from its path first, then slide the long car only when the exit lane is clear. If you wait too long, the small cars may fill the lane it needed.",
      "Step 5: Work from the open side toward the center. Once one exit lane is clear, use it to remove cars that are already facing the right direction. Avoid switching sides unless the move opens a blocked exit. The board stays easier when cars leave through one controlled flow instead of several half-open lanes.",
      "Step 6: Finish the last vehicles in exit order. Before every final move, check whether a car behind it will need the same lane. Clear the car that protects the open path first, then move the last blockers. If the clear bay stayed open, the final cars should leave without having to undo the center."
    ],
    proTips: [
      "A movable car is not always the right car. Check what exit it opens.",
      "Keep the clear bay free until the longest blocked car has moved.",
      "Move cross traffic before pulling center cars into the lane.",
      "If one exit is almost open, finish that route before starting another side.",
      "Watch long cars early because they need more space than the small cleanup cars."
    ],
    commonMistakes: [
      "Moving a small car into the clear bay and leaving it there.",
      "Opening two exits halfway instead of fully clearing one route.",
      "Letting a cross car block the main lane after the center starts moving.",
      "Saving the longest car for last when the side lane is already crowded.",
      "Chasing the first visible exit and covering the lane needed by another car."
    ],
    alternativeStrategy:
      "If the direct exit route keeps failing, try clearing from the lane with the longest car first. It may not give an immediate exit, but it removes the vehicle that needs the most space before the board gets crowded. Move the small cross cars that block that long car, keep the clear bay empty, and wait until the long car has a full path. Once it leaves, switch back to the main exit lane and clear the cars already facing out. This alternate route works because it reduces late pressure. Instead of solving every visible exit, you solve the biggest space problem first. The risk is overusing the clear bay, so only move cars there when they can leave within a move or two.",
    relatedLevels: [
      {
        label: "Parking Jam Level 450",
        href: routes.level("parking-jam", "level-450")
      },
      {
        label: "Parking Jam Level 480",
        href: routes.level("parking-jam", "level-480")
      },
      {
        label: "Parking Jam Level 435",
        href: routes.level("parking-jam", "level-435")
      },
      {
        label: "Parking Jam Level 495",
        href: routes.level("parking-jam", "level-495")
      }
    ],
    relatedGames: [
      { name: "Color Wood Jam", slug: "color-wood-jam" },
      { name: "Screw Jam", slug: "screw-jam" },
      { name: "Block Blast", slug: "block-blast" },
      { name: "Ball Sort Puzzle", slug: "ball-sort-puzzle" },
      { name: "Brain Test", slug: "brain-test" }
    ],
    faq: [
      {
        question: "Is Parking Jam Level 465 hard?",
        answer:
          "Yes. It is hard because the lot has several cars that can move but still block better exits. The safest approach is to clear cross traffic first, keep a clear bay open, and move the center only when the exit lane is ready."
      },
      {
        question: "What should I move first?",
        answer:
          "Move the car that opens the main exit lane or frees a cross car blocking several routes. Do not start with a small car that only changes position. The first move should make the next car easier to release."
      },
      {
        question: "Why do I keep getting stuck?",
        answer:
          "You are probably filling the clear bay too early or moving center cars before cross traffic is gone. Once a car sits in the open lane, the longer vehicles have no room to leave. Protect that bay longer."
      },
      {
        question: "Can I solve it without boosters or hints?",
        answer:
          "Yes. Level 465 can be solved without boosters if you move cars in exit order. Use a restart to identify which car blocks the final lane, then clear that cross car earlier in the next attempt."
      },
      {
        question: "What is the safest strategy?",
        answer:
          "Clear cross traffic, keep one bay open, free the longest blocked car, and then finish through the main exit lane. This order keeps the lot from splitting into several half-open routes that block each other."
      },
      {
        question: "What mistake should I avoid?",
        answer:
          "Avoid chasing the first car that can leave if it causes another car to block the main lane. A quick exit is not worth it when the clear bay gets filled and the longer car loses its path."
      }
    ]
  },
  "ball-sort-puzzle/level-600": {
    title: "Ball Sort Puzzle Level 600 Walkthrough & Solution",
    metaDescription:
      "Ball Sort Puzzle Level 600 walkthrough and solution with empty-tube tips, color stack order, and common mistakes that lock the final tubes.",
    heroDescription:
      "A Ball Sort Puzzle Level 600 plan for empty tube timing, color stack order, and the safest way to unlock buried colors without deadlocking.",
    introduction:
      "Stuck on Ball Sort Puzzle Level 600? The layout is not solved by pouring every matching top ball. The trouble comes from empty tubes, stacked color order, and a few locked colors buried under mixed groups. If you use both empty tubes too early, the final stacks freeze with one color split across the board. Build one clean stack first, keep a tube flexible, and uncover buried colors only when they have a real destination.",
    goal:
      "Keep at least one empty tube in rotation, build one clean color stack, and avoid splitting the same color across too many tubes. The final colors unlock once the buried stacks are separated without wasting both empty spaces.",
    whyPlayersGetStuck:
      "Players get stuck on Level 600 because the top balls make the board look safer than it is. A top-color pour can be legal but still bad if it fills an empty tube with balls that cannot move again. Ball Sort Puzzle depends on stack order, and this level hides useful colors under mixed layers. If you unlock them without a receiving tube, you turn one problem stack into several smaller problems. Empty tubes are the main resource. One should stay flexible for rotations, while the other can help build a clean color. Locked colors become trouble when players bury them again under quick pours. The level rewards patience more than speed.",
    beforeYouStart:
      "Before the first pour, find the cleanest color to build, the deepest mixed tube, the empty tube you will keep flexible, and any color that appears trapped under two different stacks. Do not pour only because the top balls match. Check whether the receiving tube stays clean and whether the move opens a buried color. If a pour fills your last empty tube with no follow-up, skip it.",
    steps: [
      "Step 1: Pick one color stack to anchor the solve. Choose a color with two or more reachable top balls and a tube that can stay clean. Pour only matching balls into that tube. This gives you one stable stack and reduces clutter before the harder buried colors need space. Avoid starting three colors at once.",
      "Step 2: Keep one empty tube flexible after the first two pours. Use it to lift a blocking ball, reveal the color underneath, and then empty it again when possible. Do not fill both empty tubes with mixed stacks. Level 600 needs a working tube late, and losing it early is the most common path to a deadlock.",
      "Step 3: Unlock buried colors with short rotations. Move the top ball from a mixed tube only when it has a clean destination or a temporary tube that can be cleared soon. Once the buried color appears, send it to its matching stack right away. This keeps locked colors from getting covered again by a random top pour.",
      "Step 4: Merge colors only when the receiving tube remains useful. A tube with three matching balls is strong if the fourth ball is reachable. A tube with two matching balls and two random blockers is trouble. After each pour, check whether the next ball of that color can move. If not, work on freeing that next ball first.",
      "Step 5: Use the second empty tube only for the middle cleanup. When the board is partly organized, a second empty tube can break the final mixed stack. Move one blocker aside, complete the color underneath, then move the blocker back into a clean route. Do not turn the second empty tube into storage unless it finishes a stack.",
      "Step 6: Finish completed colors before disturbing stable stacks. Once a color is nearly complete, pour it together and leave it alone. Use the remaining flexible tube to separate the last two colors. Avoid breaking a completed stack to fix a careless pour. If one empty tube survived, the final color order should resolve cleanly."
    ],
    proTips: [
      "Keep one empty tube cycling until the final mixed stack is broken.",
      "Build one anchor color before starting several partial stacks.",
      "A legal pour is not safe if it fills the last empty tube.",
      "Send buried colors to a destination as soon as they appear.",
      "Do not break a completed stack unless it directly unlocks the final move."
    ],
    commonMistakes: [
      "Using both empty tubes as storage during the opening.",
      "Pouring top colors together while burying a locked color underneath.",
      "Starting too many partial color stacks and losing clean destinations.",
      "Moving a blocker into a tube where it cannot leave soon.",
      "Breaking a stable stack instead of rotating through an empty tube."
    ],
    alternativeStrategy:
      "If your standard anchor-color route keeps locking, try solving around the deepest mixed tube first. Identify the color buried inside that tube, then prepare a clean destination before you move the top balls away. Use one empty tube to lift the blocker and the other only if the blocker has a clear next pour. This route delays the easy top matches, but it removes the stack that causes the final deadlock. Once the buried color is free, return to a normal solve by completing one color at a time. The important part is keeping one tube flexible. If both empty tubes become storage, the alternate strategy loses its advantage and the board will lock again near the end.",
    relatedLevels: [
      {
        label: "Ball Sort Puzzle Level 585",
        href: routes.level("ball-sort-puzzle", "level-585")
      },
      {
        label: "Ball Sort Puzzle Level 570",
        href: routes.level("ball-sort-puzzle", "level-570")
      },
      {
        label: "Ball Sort Puzzle Level 555",
        href: routes.level("ball-sort-puzzle", "level-555")
      },
      {
        label: "Ball Sort Puzzle Level 540",
        href: routes.level("ball-sort-puzzle", "level-540")
      }
    ],
    relatedGames: [
      { name: "Water Sort", slug: "water-sort" },
      { name: "Color Wood Jam", slug: "color-wood-jam" },
      { name: "Screw Jam", slug: "screw-jam" },
      { name: "Block Blast", slug: "block-blast" },
      { name: "Brain Test", slug: "brain-test" }
    ],
    faq: [
      {
        question: "Is Ball Sort Puzzle Level 600 hard?",
        answer:
          "Yes. Level 600 is hard because the empty tubes can vanish before the buried colors are unlocked. The board is manageable if you build one clean stack first and keep one tube available for rotations."
      },
      {
        question: "What should I move first?",
        answer:
          "Start by building the cleanest reachable color stack. Choose a pour that keeps the receiving tube pure and still leaves an empty tube flexible. Do not use both empty tubes in the first few moves unless one stack finishes."
      },
      {
        question: "Why do I keep getting stuck?",
        answer:
          "You are likely using empty tubes as storage or burying locked colors under quick top pours. Once every tube is partly mixed, the final colors have no destination. Protect one empty tube and uncover buried colors with short rotations."
      },
      {
        question: "Can I solve it without boosters or hints?",
        answer:
          "Yes. You can solve it without hints by managing empty tubes carefully. Build one anchor color, rotate blockers through a flexible tube, and avoid spreading the same color across too many unfinished stacks."
      },
      {
        question: "What is the safest strategy?",
        answer:
          "The safest strategy is anchor color first, one flexible empty tube, buried color cleanup, then final stack completion. This order keeps the board from turning into many partial tubes with no legal pour."
      },
      {
        question: "What mistake should I avoid?",
        answer:
          "Avoid filling both empty tubes during the opening. Even if the pours are legal, you need at least one tube available to separate locked colors later. Without that space, the last two stacks usually freeze."
      }
    ]
  }
};

function pick<T>(items: T[], seed: number) {
  return items[Math.abs(seed) % items.length];
}

function contentSeed(game: Game, level: LevelGuide, offset = 0) {
  const slugScore = [...game.slug].reduce(
    (total, character, index) => total + character.charCodeAt(0) * (index + 1),
    0
  );

  return slugScore + game.popularity * 7 + level.levelNumber * 13 + offset;
}

function profileFor(game: Game) {
  return {
    ...(categoryProfiles[game.categorySlug] ?? categoryProfiles.mechanical),
    ...(profileOverrides[game.slug] ?? {})
  };
}

function wordLevel(level: LevelGuide) {
  return `Level ${level.levelNumber}`;
}

function relatedLevelsFor(level: LevelGuide) {
  return levels
    .filter((candidate) => candidate.gameSlug === level.gameSlug)
    .filter((candidate) => candidate.levelSlug !== level.levelSlug)
    .sort(
      (a, b) =>
        Math.abs(a.levelNumber - level.levelNumber) -
          Math.abs(b.levelNumber - level.levelNumber) ||
        a.levelNumber - b.levelNumber
    )
    .slice(0, 4)
    .map((candidate) => ({
      label: `${candidate.gameName} Level ${candidate.levelNumber}`,
      href: routes.level(candidate.gameSlug, candidate.levelSlug)
    }));
}

function relatedGamesFor(game: Game) {
  const slugs = [
    ...game.relatedGames,
    ...defaultRelatedGameSlugs.filter((slug) => slug !== game.slug)
  ];
  const uniqueSlugs = [...new Set(slugs)].slice(0, 5);

  return uniqueSlugs
    .map((slug) => games.find((candidate) => candidate.slug === slug))
    .filter((candidate): candidate is Game => Boolean(candidate))
    .map((candidate) => ({
      name: candidate.name,
      slug: candidate.slug
    }));
}

function buildIntroduction(game: Game, level: LevelGuide, profile: PlayProfile) {
  const levelLabel = wordLevel(level);
  const opener = pick(
    [
      `Stuck on ${game.name} ${levelLabel}?`,
      `If ${game.name} ${levelLabel} keeps stopping you near the end, slow the opening down.`,
      `${game.name} ${levelLabel} looks manageable at first, but the board tightens fast.`
    ],
    level.levelNumber + game.popularity
  );

  return `${opener} This stage is less about a lucky move and more about keeping the ${profile.lane} open. The early ${profile.board} looks open, but ${profile.pressure}. Players often run into trouble when they take the first available ${profile.quickClear} instead of the move that opens space for later. Treat the opening as setup: loosen the ${profile.edge}, protect one ${profile.buffer}, and wait until the ${profile.center} has a real path. Once the ${profile.blocker} moves, the rest of the level becomes much easier to read.`;
}

function buildWhyPlayersGetStuck(
  game: Game,
  level: LevelGuide,
  profile: PlayProfile
) {
  const seed = contentSeed(game, level);
  const middleWarning = pick(
    [
      `The ${profile.center} is especially easy to misuse because it feels like temporary storage, but it becomes the hardest area to fix once the ${profile.edge} is crowded.`,
      `The ${profile.center} can look like a harmless holding area, but it turns into the main problem when the outside route is already full.`,
      `Players often treat the ${profile.center} as spare space, then discover it was the lane the ending needed.`
    ],
    seed
  );
  const earlyMistake = pick(
    [
      `Wrong first moves also hide the ${profile.hiddenPattern}; you may clear one obvious piece and miss the move that would have opened two options.`,
      `A poor opener can also cover the ${profile.hiddenPattern}, making the next safe move much harder to see.`,
      `The hidden pattern is easy to miss when the first move only chases a visible clear.`
    ],
    seed + 4
  );
  const restartLine = pick(
    [
      `This is also why a calm restart often fixes the level faster than forcing the last move.`,
      `A restart with a different opener is usually better than pushing a trapped ending.`,
      `When the same ending fails twice, the opener is the part worth changing.`
    ],
    seed + 8
  );

  return `Players often run into trouble when a ${profile.unit} looks free but quietly blocks something behind it. In ${game.name} ${wordLevel(level)}, one early ${profile.quickClear} can fill the best ${profile.lane}, and then the next two ${profile.units} have nowhere useful to go. ${middleWarning} ${earlyMistake} If your attempt ends with one ${profile.lockedUnit} stuck, the mistake probably happened much earlier. Go back to the first move that used your ${profile.buffer} and choose a safer setup instead. ${restartLine}`;
}

function buildBeforeYouStart(game: Game, level: LevelGuide, profile: PlayProfile) {
  const seed = contentSeed(game, level);
  const scanLine = pick(
    [
      `Before you touch the first ${profile.unit}, scan the full ${profile.board} from the ${profile.edge} toward the ${profile.center}.`,
      `Before the opening move, read the ${profile.board} from the outside in and note which ${profile.units} are already under pressure.`,
      `Before you start, look across the ${profile.edge}, the ${profile.center}, and the lane that is most likely to close.`
    ],
    seed
  );
  const spaceLine = pick(
    [
      `Mark the move that frees another slot or gives a blocked piece a clear route.`,
      `Your first useful move should either free a slot or make the next blocked piece easier to move.`,
      `Look for the setup move that improves two future choices instead of only clearing one piece.`
    ],
    seed + 3
  );
  const warningLine = pick(
    [
      `A safer move is usually the one that creates room, not the one that clears fastest.`,
      `The safest opening is often quiet: it gives you room before it gives you a visible clear.`,
      `If a move looks fast but spends the buffer, leave it alone until the board is wider.`
    ],
    seed + 7
  );
  const centerLine = pick(
    [
      `Do not rush the center while the side still has pressure.`,
      `Keep the middle calm until the side lane can absorb a mistake.`,
      `The center should wait until at least one side can handle the next move.`
    ],
    seed + 11
  );

  return `${scanLine} ${spaceLine} ${warningLine} ${centerLine} Keep at least one ${profile.buffer} open, even if it feels wasteful for a move or two. That spare space is what lets you recover when ${game.name} ${wordLevel(level)} starts to close down.`;
}

function buildGoal(game: Game, level: LevelGuide, profile: PlayProfile) {
  return `The goal is to open the ${profile.edge}, protect one ${profile.buffer}, and delay the ${profile.lockedUnit} until the ${profile.lane} is ready. Once the ${profile.center} has room, move through the ${profile.blocker} slowly and finish ${game.name} ${wordLevel(level)} through the open route.`;
}

function buildSteps(game: Game, level: LevelGuide, profile: PlayProfile) {
  const levelLabel = wordLevel(level);
  const seed = contentSeed(game, level);
  const moveFirst = pick(
    [
      `Move that first, even if a quicker clear is sitting nearby.`,
      `Take that setup move before the easy clear.`,
      `Use that move as the opener, even if another piece looks more tempting.`
    ],
    seed
  );
  const checkNext = pick(
    [
      `After it moves, check whether another ${profile.unit} now has a clean path.`,
      `Once it moves, pause and look for the next lane that opened.`,
      `After the opener, do not continue until you can name the next safe move.`
    ],
    seed + 5
  );
  const widenBoard = pick(
    [
      `The goal is to make the board wider before the tight section starts.`,
      `You want more working room before the level asks for precise moves.`,
      `This gives you space before the risky middle sequence begins.`
    ],
    seed + 9
  );
  const lockedSetup = pick(
    [
      `Some pieces look ready because they can move, but they are holding the order together.`,
      `A movable piece is not always a safe piece; sometimes it is keeping the pattern readable.`,
      `If a piece is holding back another route, movement alone is not enough reason to use it.`
    ],
    seed + 13
  );
  const lockedRule = pick(
    [
      `A locked piece should move only when it clears right away or releases something behind it.`,
      `Move it only when the lane beyond it is ready.`,
      `Wait until it either clears immediately or opens a piece that was trapped behind it.`
    ],
    seed + 17
  );
  const lockedEnding = pick(
    [
      `This keeps the level from turning into several pieces fighting for one path.`,
      `That patience prevents three pieces from needing the same lane later.`,
      `It also keeps the final route from collapsing into a one-move shortage.`
    ],
    seed + 21
  );
  const bufferLine = pick(
    [
      `Pick the side that gives you the cleanest movement and treat it as a buffer.`,
      `Choose the side with the least pressure and keep it available as your working lane.`,
      `Use the side lane that opens most naturally and protect it for the middle sequence.`
    ],
    seed + 25
  );
  const lateJam = pick(
    [
      `The board gets tight quickly, so this spare route is your best protection against a late jam.`,
      `When space starts disappearing, that open route is what keeps the board recoverable.`,
      `A single protected route is usually enough to stop the ending from locking up.`
    ],
    seed + 29
  );
  const middleStart = pick(
    [
      `Once the edges are lighter, start moving the middle pieces carefully.`,
      `After the sides loosen, move into the middle without rushing the second clear.`,
      `When the side pressure drops, begin the middle sequence one controlled move at a time.`
    ],
    seed + 33
  );
  const middleRule = pick(
    [
      `Do not clear two center pieces in a row unless the first one creates real space.`,
      `Avoid back-to-back middle moves unless the first move opens another lane.`,
      `If the first middle move does not widen the board, make a side adjustment before continuing.`
    ],
    seed + 37
  );
  const finalStart = pick(
    [
      `In the last section, stop chasing speed and check each lane before moving.`,
      `For the final moves, slow down and review every lane before committing.`,
      `Near the end, treat each move as a lane check rather than a race to clear.`
    ],
    seed + 41
  );
  const finalClear = pick(
    [
      `Clear the pieces already aligned with the ${profile.cleanup}, then use the open buffer for the final awkward piece.`,
      `Take the pieces that already line up with the ${profile.cleanup}, then save the buffer for the awkward one.`,
      `Use the clean clears first, and keep the open buffer ready for the piece that still needs help.`
    ],
    seed + 45
  );
  const finalAvoid = pick(
    [
      `Avoid dragging top or center pieces down too early.`,
      `Do not pull upper pieces into the lane before the exit is ready.`,
      `Leave top pieces alone if they would crowd the last route.`
    ],
    seed + 49
  );
  const finalFinish = pick(
    [
      `If one lane stayed open, the ending should finish without forcing a restart.`,
      `With the lane still open, the last clear should feel controlled instead of forced.`,
      `That open route gives the final sequence enough room to land.`
    ],
    seed + 53
  );

  return [
    `Step 1: Identify the ${profile.units} that free multiple slots. Look for the ${profile.unit} that opens more than one follow-up move near the ${profile.edge} or a blocked ${profile.lane}. ${moveFirst} In ${game.name} ${levelLabel}, the best opener gives you working room and reveals the next choice. ${checkNext}`,
    `Step 2: Clear the ${profile.edge} before the ${profile.center}. Outer moves are safer because they widen the ${profile.board} and keep the risky area flexible. Clear the side pieces that expose the ${profile.hiddenPattern}, then pause before moving into the middle. If an edge move would fill your only ${profile.buffer}, leave it for later. ${widenBoard}`,
    `Step 3: Avoid moving the ${profile.lockedUnit} too early. ${lockedSetup} If moving one would land it in front of the ${profile.blocker}, wait until another lane opens. ${lockedRule} ${lockedEnding}`,
    `Step 4: Keep one ${profile.lane} open. ${bufferLine} Do not fill it with a ${profile.unit} that has no follow-up. When the ${profile.center} starts to loosen, use that lane to rotate pieces out and back into place. ${lateJam}`,
    `Step 5: Work through the ${profile.center} one move at a time. ${middleStart} ${middleRule} Watch which ${profile.units} are waiting behind the ${profile.blocker}. If a move covers the ${profile.hiddenPattern}, choose the piece that opens the lane instead.`,
    `Step 6: Clean the remaining ${profile.units} and finish the level. ${finalStart} ${finalClear} ${finalAvoid} ${finalFinish}`
  ];
}

function buildMetaDescription(game: Game, level: LevelGuide, profile: PlayProfile) {
  return pick(
    [
      `Stuck on ${game.name} Level ${level.levelNumber}? Learn the safest opening, avoid common blocking mistakes, and clear this tricky level with step-by-step help.`,
      `Need help with ${game.name} Level ${level.levelNumber}? Follow a clear walkthrough for the opening move, tight ${profile.lane}, common mistakes, and final cleanup.`,
      `Solve ${game.name} Level ${level.levelNumber} with a practical written guide covering the safest first move, blocked ${profile.units}, tips, and FAQ.`
    ],
    contentSeed(game, level)
  );
}

function buildProTips(game: Game, level: LevelGuide, profile: PlayProfile) {
  const seed = contentSeed(game, level);

  return [
    pick(
      [
        `Watch for repeated ${profile.hiddenPattern}; one copy usually opens a safer path.`,
        `When the same ${profile.hiddenPattern} appears twice, clear the one that opens space first.`,
        `Repeated patterns are clues; use the one that frees the lane, not the one that only looks easy.`
      ],
      seed
    ),
    pick(
      [
        `Leave one ${profile.buffer} free until the ${profile.center} is nearly solved.`,
        `Keep a ${profile.buffer} available until the blocker has moved.`,
        `Do not spend the spare space until the middle has a clean route.`
      ],
      seed + 3
    ),
    pick(
      [
        `Do not rush the ${profile.quickClear}; check what it blocks first.`,
        `A quick clear is only safe when the next move still has room.`,
        `If the easy move fills your lane, save it for later.`
      ],
      seed + 6
    ),
    pick(
      [
        `After each move, look behind the ${profile.unit}, not only at the clear.`,
        `Check what a move reveals before you commit to the next one.`,
        `The piece behind your move often matters more than the piece you cleared.`
      ],
      seed + 9
    ),
    pick(
      [
        `Use restarts to learn which ${profile.lane} needs protection.`,
        `If the same lane jams twice, change the opener instead of forcing the ending.`,
        `A failed run is useful when it shows which route needed to stay open.`
      ],
      seed + 12
    )
  ];
}

function buildCommonMistakes(game: Game, level: LevelGuide, profile: PlayProfile) {
  const seed = contentSeed(game, level);

  return [
    pick(
      [
        `Moving randomly turns the level into guesswork instead of a sequence.`,
        `Taking every available move makes the board harder to read.`,
        `Guessing through the opener usually creates the late jam.`
      ],
      seed
    ),
    pick(
      [
        `Ignoring the ${profile.hiddenPattern} lets two ${profile.units} fight for one path.`,
        `Missing the hidden order leaves the same lane overloaded.`,
        `Skipping the pattern check is how the final route gets blocked.`
      ],
      seed + 4
    ),
    pick(
      [
        `Filling the ${profile.buffer} too early removes your recovery space.`,
        `Using the buffer as storage too soon leaves no place to recover.`,
        `The spare slot should stay useful, not become a parking spot.`
      ],
      seed + 8
    ),
    pick(
      [
        `Rushing the ${profile.center} before the edges are lighter creates late jams.`,
        `Moving into the center too soon makes the side pieces harder to free.`,
        `The middle becomes risky when the outer lane is still crowded.`
      ],
      seed + 12
    ),
    pick(
      [
        `Saving the tightest ${profile.lane} for last is risky; free it earlier.`,
        `Leaving the hardest lane untouched until the end usually costs a restart.`,
        `If one route already looks tight, open it while you still have room.`
      ],
      seed + 16
    )
  ];
}

function buildAlternativeStrategy(
  game: Game,
  level: LevelGuide,
  profile: PlayProfile
) {
  const seed = contentSeed(game, level);
  const shiftLine = pick(
    [
      `Once the first side is stable, shift across the board and work from outside to inside.`,
      `After that side settles, move across slowly and clear the opposite edge before touching the middle again.`,
      `When the first pocket is working, use it to pull pressure away from the opposite side.`
    ],
    seed
  );
  const controlLine = pick(
    [
      `This route is a little slower, but it gives you more control because you are not trying to solve the whole ${profile.board} at once.`,
      `The route takes a few extra checks, but it keeps the board easier to read.`,
      `It is not the fastest route, but it lowers the chance that one blocked lane ruins the ending.`
    ],
    seed + 6
  );
  const pauseLine = pick(
    [
      `Use the pause before the middle as a quick check, not as a place to store extra pieces.`,
      `Before moving back into the middle, check that the pocket still has a way out.`,
      `That small pause keeps the alternate route from becoming another blocked lane.`
    ],
    seed + 12
  );

  return `If the normal route keeps getting stuck, try playing from the ${profile.side} first and delay the ${profile.center}. Start with the move that opens the cleanest ${profile.lane}, then keep one nearby ${profile.buffer} empty as a turning point. Only move the opposite-side ${profile.units} when they can clear immediately or reveal the ${profile.hiddenPattern}. ${shiftLine} ${controlLine} You are building a pocket, using it to move awkward pieces, and then closing ${game.name} ${wordLevel(level)} after the ${profile.blocker} has fewer ways to trap the final sequence. ${pauseLine}`;
}

function buildFaq(game: Game, level: LevelGuide, profile: PlayProfile) {
  const levelLabel = wordLevel(level);
  const seed = contentSeed(game, level);
  const firstAnswerEnd = pick(
    [
      `Choose the move that makes the next choice easier.`,
      `The right opener should make the second move easier to see.`,
      `If the next move becomes clearer, the opener is doing its job.`
    ],
    seed
  );
  const blockedAnswerEnd = pick(
    [
      `Most failed attempts close the recovery lane too early.`,
      `The usual failed run spends the recovery lane before the blocker moves.`,
      `If the same piece keeps getting trapped, your spare lane was probably used too soon.`
    ],
    seed + 5
  );
  const hintsAnswer = pick(
    [
      `Yes. You can solve ${levelLabel} without hints if you restart with a purpose instead of repeating the same opener. Watch which ${profile.unit} gets trapped, then protect the lane it needed. The level rewards patient reading more than guessing.`,
      `Yes. A hint is not required if you use each failed attempt as information. Notice which ${profile.unit} was trapped, change the opener, and keep the lane it needed available next time.`,
      `Yes. Play slowly, note where the board jammed, and restart with a different setup. ${levelLabel} usually opens up once the recovery lane stays free long enough.`
    ],
    seed + 10
  );
  const safestAnswer = pick(
    [
      `The safest sequence is to open the edge, protect one buffer, delay the locked piece, solve the middle slowly, and clean up through the open lane. Treat the level as a space puzzle first. The final clears are easier once the board can breathe.`,
      `Open the edge first, keep a buffer, wait on the locked piece, then work through the middle one move at a time. Once the lane is open, the final clears should be straightforward.`,
      `Use a space-first order: edge, buffer, locked piece, middle, cleanup. That route keeps the board readable and avoids forcing the ending through a blocked lane.`
    ],
    seed + 15
  );

  return [
    {
      question: `Is ${game.name} ${levelLabel} hard?`,
      answer: `Yes, it can be hard because the ${profile.board} loses space after only a few wrong moves. The level is not about speed. It is about protecting one ${profile.lane}, reading the ${profile.hiddenPattern}, and waiting until the ${profile.center} has room.`
    },
    {
      question: "What should I move first?",
      answer: `Start with the ${profile.unit} that opens more than one follow-up move. If a visible ${profile.quickClear} does not create room or protect your ${profile.buffer}, it is probably not the safest opener. Choose the move that makes the next choice easier.`
        .replace("Choose the move that makes the next choice easier.", firstAnswerEnd)
    },
    {
      question: "How do I avoid getting blocked?",
      answer: `Keep one ${profile.lane} open and avoid using it as storage for a piece that cannot clear soon. Before each move, check whether another ${profile.unit} will need that same path later. ${blockedAnswerEnd}`
    },
    {
      question: "Can I solve it without hints?",
      answer: hintsAnswer
    },
    {
      question: "Should I clear the edges first?",
      answer: `Usually yes. The ${profile.edge} gives you safer movement and keeps the ${profile.center} from filling too soon. Clear edge pieces that reveal the ${profile.hiddenPattern} or open another route, then move inward after your ${profile.buffer} is ready.`
    },
    {
      question: "What is the safest sequence?",
      answer: safestAnswer
    }
  ];
}

function buildTopLevelManualContent(
  game: Game,
  level: LevelGuide
): TopManualLevelContent {
  const profile = profileFor(game);

  return {
    title: `${game.name} Level ${level.levelNumber} Walkthrough`,
    metaDescription: buildMetaDescription(game, level, profile),
    heroDescription: `A practical written route through Level ${level.levelNumber}, focused on safe order, open space, and the late move that usually decides the board.`,
    introduction: buildIntroduction(game, level, profile),
    goal: buildGoal(game, level, profile),
    whyPlayersGetStuck: buildWhyPlayersGetStuck(game, level, profile),
    beforeYouStart: buildBeforeYouStart(game, level, profile),
    steps: buildSteps(game, level, profile),
    proTips: buildProTips(game, level, profile),
    commonMistakes: buildCommonMistakes(game, level, profile),
    alternativeStrategy: buildAlternativeStrategy(game, level, profile),
    relatedLevels: relatedLevelsFor(level),
    relatedGames: relatedGamesFor(game),
    faq: buildFaq(game, level, profile)
  };
}

export function getTopLevelManualContent(
  gameSlug: string,
  levelSlug: string
): TopManualLevelContent | undefined {
  const key = contentKey(gameSlug, levelSlug);

  if (!topLevelKeys.has(key)) {
    return undefined;
  }

  const level = levels.find(
    (candidate) =>
      candidate.gameSlug === gameSlug && candidate.levelSlug === levelSlug
  );
  const game = games.find((candidate) => candidate.slug === gameSlug);

  if (!level || !game) {
    return undefined;
  }

  return buildTopLevelManualContent(game, level);
}

export function getFeaturedLevelManualContent(
  gameSlug: string,
  levelSlug: string
): TopManualLevelContent | undefined {
  return featuredLevelManualContentByPath[contentKey(gameSlug, levelSlug)];
}
