export type VariationContext = {
  gameName: string;
  levelNumber: string;
  mechanic: string;
  opening: string;
  blocker: string;
  cleanup: string;
  mistake: string;
};

type PhraseBuilder = (context: VariationContext) => string;
type FaqBuilder = (context: VariationContext) => {
  question: string;
  answer: string;
};

export const beforeDuplicateWarnings = 64;

export const walkthroughSummaryPool: PhraseBuilder[] = [
  (ctx) =>
    `In ${ctx.gameName} Level ${ctx.levelNumber}, the first priority is to read the board before committing space. The safest route is to manage ${ctx.mechanic} and avoid ${ctx.mistake}.`,
  (ctx) =>
    `Level ${ctx.levelNumber} introduces a tighter version of ${ctx.gameName}'s core puzzle loop. Focus on the main blocker first, then set up the cleanup path.`,
  (ctx) =>
    `Players often struggle with ${ctx.gameName} Level ${ctx.levelNumber} because one early move can remove the final route. Work from the outside pressure point toward the last clear.`,
  (ctx) =>
    `One of the biggest challenges in ${ctx.gameName} Level ${ctx.levelNumber} is keeping enough working space open. Treat each move as setup for the final sequence.`,
  (ctx) =>
    `At first glance, ${ctx.gameName} Level ${ctx.levelNumber} looks direct, but the board punishes rushed moves. Start with space control and finish only when the route is open.`,
  (ctx) =>
    `Unlike easier stages, ${ctx.gameName} Level ${ctx.levelNumber} asks you to protect the final lane before chasing quick progress. The key is patient sequencing.`,
  (ctx) =>
    `This stage focuses on ${ctx.mechanic} with very little room for wasted movement. In ${ctx.gameName} Level ${ctx.levelNumber}, build the solution around the blocker that controls the endgame.`,
  (ctx) =>
    `The key objective in ${ctx.gameName} Level ${ctx.levelNumber} is not the first clear; it is preserving the move that makes the last clear possible.`,
  (ctx) =>
    `Many players get stuck on ${ctx.gameName} Level ${ctx.levelNumber} when they solve the visible piece and trap the hidden route. Open the board first, then clean up.`,
  (ctx) =>
    `Success in ${ctx.gameName} Level ${ctx.levelNumber} depends on timing. Use early moves to create options, then spend those options only when the final path is ready.`,
  (ctx) =>
    `${ctx.gameName} Level ${ctx.levelNumber} rewards a slow opening more than a fast clear. Identify the move that protects the board and build the solution from there.`,
  (ctx) =>
    `The best way through ${ctx.gameName} Level ${ctx.levelNumber} is to separate setup moves from finish moves. Setup creates space; finish moves should happen only after the blocker is handled.`,
  (ctx) =>
    `In this walkthrough for ${ctx.gameName} Level ${ctx.levelNumber}, the main idea is to avoid spending the reserve move too soon. Keep control until the cleanup path is visible.`,
  (ctx) =>
    `${ctx.gameName} Level ${ctx.levelNumber} becomes easier once you stop chasing every available clear. Use the first safe move to make the later board easier to read.`,
  (ctx) =>
    `The pressure point in ${ctx.gameName} Level ${ctx.levelNumber} is the move that can either open the board or close it. Choose the route that leaves the most follow-up options.`,
  (ctx) =>
    `For ${ctx.gameName} Level ${ctx.levelNumber}, think of the level as a two-part puzzle: create space first, then run the planned finish without disturbing the final lane.`,
  (ctx) =>
    `This ${ctx.gameName} Level ${ctx.levelNumber} solution is about discipline. Do not use the helpful-looking move until it supports the last sequence.`,
  (ctx) =>
    `The cleanest path through ${ctx.gameName} Level ${ctx.levelNumber} starts with the blocker, not the easiest clear. Once the blocker moves, the rest of the board becomes safer.`,
  (ctx) =>
    `${ctx.gameName} Level ${ctx.levelNumber} asks you to balance short-term progress with long-term space. Keep the board flexible until the final pieces can move together.`,
  (ctx) =>
    `A reliable ${ctx.gameName} Level ${ctx.levelNumber} walkthrough starts by finding what must stay open. If that space survives the opening, the final sequence is much easier.`
];

export const proTipPool: PhraseBuilder[] = [
  (ctx) => `For ${ctx.gameName} Level ${ctx.levelNumber}, create more free space before taking the first obvious clear.`,
  (ctx) => `Avoid rushing early moves in ${ctx.gameName} Level ${ctx.levelNumber}; the last route matters more than the first reward.`,
  (ctx) => `Focus on outer blockers first when ${ctx.gameName} Level ${ctx.levelNumber} gives you several tempting center moves.`,
  (ctx) => `Save any limited helper or reserve space in ${ctx.gameName} Level ${ctx.levelNumber} until the board is close to cleanup.`,
  (ctx) => `Watch color, lane, or storage balance carefully throughout ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Prioritize the piece that blocks future movement in ${ctx.gameName} Level ${ctx.levelNumber}, not the piece that clears fastest.`,
  (ctx) => `Use the safest opening in ${ctx.gameName} Level ${ctx.levelNumber} to expose the move order before you commit.`,
  (ctx) => `Keep one backup option available while solving ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Delay the center action in ${ctx.gameName} Level ${ctx.levelNumber} if it reduces your cleanup space.`,
  (ctx) => `Check the final lane before moving a large blocker in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Treat temporary space as a tool during ${ctx.gameName} Level ${ctx.levelNumber}, not as storage for random pieces.`,
  (ctx) => `In ${ctx.gameName} Level ${ctx.levelNumber}, every move should either open space or protect the finish.`,
  (ctx) => `Look two moves ahead before spending the best open pocket in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `If ${ctx.gameName} Level ${ctx.levelNumber} locks up, restart from the first move that removed flexibility.`,
  (ctx) => `Use small safe moves to test the board flow in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Keep the cleanup route visible while working through ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Do not break a useful group in ${ctx.gameName} Level ${ctx.levelNumber} unless it unlocks a better chain.`,
  (ctx) => `For ${ctx.gameName} Level ${ctx.levelNumber}, clear side pressure before the central pressure point.`,
  (ctx) => `Track what opens after each move in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Use the first quiet move in ${ctx.gameName} Level ${ctx.levelNumber} to prepare the final burst.`,
  (ctx) => `Avoid moves that leave only one follow-up path in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `The best move in ${ctx.gameName} Level ${ctx.levelNumber} is often the one that preserves two choices.`,
  (ctx) => `Before the final sequence in ${ctx.gameName} Level ${ctx.levelNumber}, confirm every blocker has somewhere to go.`,
  (ctx) => `Use ${ctx.mechanic} as the main planning rule for ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `If a move feels helpful in ${ctx.gameName} Level ${ctx.levelNumber}, check whether it helps the last three moves too.`,
  (ctx) => `Keep the busiest lane open in ${ctx.gameName} Level ${ctx.levelNumber} until the main blocker is settled.`,
  (ctx) => `Try to make each early move in ${ctx.gameName} Level ${ctx.levelNumber} reduce clutter without creating a new trap.`,
  (ctx) => `When ${ctx.gameName} Level ${ctx.levelNumber} offers a quick clear, ask what it does to the final route.`,
  (ctx) => `Use repeated patterns from nearby levels to recognize the trap in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Build the finish in ${ctx.gameName} Level ${ctx.levelNumber} before you spend the safest reserve space.`,
  (ctx) => `Keep awkward pieces movable during ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Separate setup moves and finish moves while solving ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `In ${ctx.gameName} Level ${ctx.levelNumber}, avoid clearing a piece that was holding open a better route.`,
  (ctx) => `Use the blocker position to decide the next move in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Move the piece with the fewest future exits first in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Protect any empty lane or slot that can rescue the ending of ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Do not spend your best recovery option early in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `A clean ${ctx.gameName} Level ${ctx.levelNumber} solution usually begins with space, not speed.`,
  (ctx) => `Use calm, reversible moves while reading ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Check whether the current move improves the board after two more moves in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `For ${ctx.gameName} Level ${ctx.levelNumber}, prioritize stable progress over dramatic clears.`,
  (ctx) => `Watch for pieces that become trapped after a single wrong move in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Use the least crowded route first when ${ctx.gameName} Level ${ctx.levelNumber} has multiple paths.`,
  (ctx) => `Keep the final group untouched until the support moves are ready in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `If the board feels tight in ${ctx.gameName} Level ${ctx.levelNumber}, make a move that increases options first.`,
  (ctx) => `Avoid mixing unrelated goals during ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Use the main blocker as your timing signal in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `In ${ctx.gameName} Level ${ctx.levelNumber}, solve the path that can fail first.`,
  (ctx) => `Let the board breathe before starting the finish in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `For ${ctx.gameName} Level ${ctx.levelNumber}, the safest plan is the one that keeps recovery space open.`
];

export const commonMistakePool: PhraseBuilder[] = [
  (ctx) => `Using helpers or reserve space too early in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Clearing center blockers before the outer route is ready in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Ignoring corner or side pressure during ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Blocking future moves while chasing a fast clear in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Wasting limited spaces before the final route appears in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Moving the loudest piece instead of the most restrictive piece in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Breaking a useful group without a follow-up plan in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Closing the route that the last sequence needs in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Treating temporary storage as permanent space in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Starting the finish before support moves are complete in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Forgetting that ${ctx.mechanic} controls the ending of ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Clearing a safe piece while leaving the real blocker untouched in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Creating a narrow pocket that cannot help the cleanup in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Using the best lane for a piece that does not finish ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Restarting too late after the board is already locked in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Overlooking the second move in a chain during ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Moving pieces into the final lane too soon in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Letting the main blocker control the board for too long in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Solving the visible problem while making the hidden problem worse in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Ignoring the cleanup route when the opening looks easy in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Making a one-way move before checking recovery space in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Spending the safest open slot on a low-value move in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Finishing a small objective that blocks the main path in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Moving too many unrelated pieces before stabilizing ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Assuming the first clear is the best clear in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Forgetting to preserve a backup move during ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Letting the board split into isolated spaces in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Using a cleanup move as an opening move in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Missing the blocker created by ${ctx.mistake} in ${ctx.gameName} Level ${ctx.levelNumber}.`,
  (ctx) => `Pushing the final sequence before the board is flexible in ${ctx.gameName} Level ${ctx.levelNumber}.`
];

export const faqPool: FaqBuilder[] = [
  (ctx) => ({
    question: `Is ${ctx.gameName} Level ${ctx.levelNumber} difficult?`,
    answer: `${ctx.gameName} Level ${ctx.levelNumber} can feel difficult because ${ctx.mechanic} leaves little room for wasted setup moves.`
  }),
  (ctx) => ({
    question: `Can I finish ${ctx.gameName} Level ${ctx.levelNumber} without boosters?`,
    answer: `Yes, the safer approach is to preserve space first and use the planned cleanup route instead of relying on a booster.`
  }),
  (ctx) => ({
    question: `Which pieces should I clear first in ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `Start with the piece or route that opens future movement, then delay the final group until the blocker is controlled.`
  }),
  (ctx) => ({
    question: `How many moves are required for ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `The exact move count can vary, but a clean solution uses setup moves first and avoids any move that traps the final path.`
  }),
  (ctx) => ({
    question: `Is there another strategy for ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `There can be small variations, but every reliable strategy protects working space before committing to the finish.`
  }),
  (ctx) => ({
    question: `Why does ${ctx.gameName} Level ${ctx.levelNumber} lock up near the end?`,
    answer: `Late locks usually happen when the opening spends the space needed for ${ctx.cleanup.toLowerCase()}`
  }),
  (ctx) => ({
    question: `What should I watch first in ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `Watch the blocker tied to ${ctx.mistake}; it is the move that most often decides whether the level remains solvable.`
  }),
  (ctx) => ({
    question: `Should I restart ${ctx.gameName} Level ${ctx.levelNumber} after a bad opening?`,
    answer: `Restart if the board loses all backup space, because the final sequence depends on having at least one recovery option.`
  }),
  (ctx) => ({
    question: `What is the safest opening for ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `${ctx.opening} This opening keeps the board readable without forcing the finish too soon.`
  }),
  (ctx) => ({
    question: `What causes most failed attempts on ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `Most failures come from ${ctx.mistake}, especially when players clear visible pieces without checking the end route.`
  }),
  (ctx) => ({
    question: `Can I use the same plan on nearby ${ctx.gameName} levels?`,
    answer: `Yes, nearby levels often repeat the same pressure pattern, but Level ${ctx.levelNumber} still needs its own timing.`
  }),
  (ctx) => ({
    question: `What is the main objective in ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `The main objective is to create safe movement first and then complete the cleanup after the blocker stops controlling the board.`
  }),
  (ctx) => ({
    question: `Is the center move safe in ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `Only use a center move when it improves the final route; otherwise it can remove the space needed for recovery.`
  }),
  (ctx) => ({
    question: `When should I start the final sequence in ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `Start the final sequence after the blocker has moved and each remaining piece has a clear destination.`
  }),
  (ctx) => ({
    question: `What is the fastest way to improve ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `The fastest improvement is to stop spending temporary space early and use it only for moves that reopen the board.`
  }),
  (ctx) => ({
    question: `Does ${ctx.gameName} Level ${ctx.levelNumber} need exact order?`,
    answer: `Yes, order matters because ${ctx.mechanic} can turn a small early mistake into a late board lock.`
  }),
  (ctx) => ({
    question: `Can I solve ${ctx.gameName} Level ${ctx.levelNumber} with a different route?`,
    answer: `A different route can work if it still keeps the same recovery space open until the final cleanup.`
  }),
  (ctx) => ({
    question: `Why is the last move hard in ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `The last move is hard when the opening does not leave enough room for the final blocker to exit cleanly.`
  }),
  (ctx) => ({
    question: `What is the biggest trap in ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `The biggest trap is solving the visible path while quietly closing the route needed by the final sequence.`
  }),
  (ctx) => ({
    question: `Should I clear small pieces first in ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `Clear small pieces first only if they increase movement for the main blocker or protect the final route.`
  }),
  (ctx) => ({
    question: `How do I recover if ${ctx.gameName} Level ${ctx.levelNumber} feels stuck?`,
    answer: `Trace back to the move that removed your last backup option, then restart with that space protected.`
  }),
  (ctx) => ({
    question: `What makes ${ctx.gameName} Level ${ctx.levelNumber} different?`,
    answer: `This level puts more pressure on ${ctx.mechanic}, so the opening has to support the ending rather than chase speed.`
  }),
  (ctx) => ({
    question: `Can I skip the planned opening in ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `Skipping the opening is risky because the level depends on having enough room before the blocker is moved.`
  }),
  (ctx) => ({
    question: `Where should I focus my attention in ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `Focus on the lane, slot, group, or route that must stay open for the cleanup move.`
  }),
  (ctx) => ({
    question: `Is ${ctx.gameName} Level ${ctx.levelNumber} mostly about speed?`,
    answer: `No. It is mostly about control, because fast moves can close the board before the real solution is ready.`
  }),
  (ctx) => ({
    question: `What should I do before the final clear in ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `Confirm that the blocker has moved, the backup space is still useful, and the final route is not crowded.`
  }),
  (ctx) => ({
    question: `Why do early moves matter in ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `Early moves decide whether the cleanup path stays open, especially when ${ctx.mistake} is possible.`
  }),
  (ctx) => ({
    question: `Can a quick clear hurt ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `Yes. A quick clear can hurt if it removes the only space needed to move the final blocker.`
  }),
  (ctx) => ({
    question: `What is the best mindset for ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `Think in two phases: create options first, then spend those options on the final cleanup.`
  }),
  (ctx) => ({
    question: `Does ${ctx.gameName} Level ${ctx.levelNumber} repeat earlier patterns?`,
    answer: `It may repeat earlier patterns, but the tighter space means the same idea needs cleaner timing.`
  }),
  (ctx) => ({
    question: `What if I run out of space in ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `Running out of space means the setup moved too quickly; restart and keep one recovery option open longer.`
  }),
  (ctx) => ({
    question: `Is the first clear important in ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `The first clear is important only if it improves the board for the next two or three moves.`
  }),
  (ctx) => ({
    question: `How should I use side space in ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `Use side space to stage the finish, not to hide pieces that cannot help the cleanup.`
  }),
  (ctx) => ({
    question: `Why does ${ctx.gameName} Level ${ctx.levelNumber} need patience?`,
    answer: `Patience matters because a slow setup can keep the final route open while a fast setup can close it.`
  }),
  (ctx) => ({
    question: `What is the safest recovery move in ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `The safest recovery move is the one that restores movement without touching the final route too early.`
  }),
  (ctx) => ({
    question: `Can I follow this ${ctx.gameName} Level ${ctx.levelNumber} guide exactly?`,
    answer: `Use it as the main route, but adapt small moves if your board state changes after an earlier choice.`
  }),
  (ctx) => ({
    question: `What should I avoid first in ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `Avoid any move that creates a one-way board before the main blocker has a clear destination.`
  }),
  (ctx) => ({
    question: `How can I spot the blocker in ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `The blocker is usually the piece or route that prevents several other moves from becoming useful.`
  }),
  (ctx) => ({
    question: `Does ${ctx.gameName} Level ${ctx.levelNumber} reward trial and error?`,
    answer: `Small tests can help, but blind trial and error usually wastes the exact space needed for cleanup.`
  }),
  (ctx) => ({
    question: `What makes a clean solution for ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `A clean solution keeps space open, moves the blocker at the right time, and finishes without emergency fixes.`
  }),
  (ctx) => ({
    question: `How do I know the ending is ready in ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `The ending is ready when every remaining move has a destination and the reserve space is no longer needed.`
  }),
  (ctx) => ({
    question: `Should I copy the first available move in ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `No. Check whether that move supports the final path before you copy it into your run.`
  }),
  (ctx) => ({
    question: `What if two moves look safe in ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `Choose the move that leaves more future options, because flexibility is usually stronger than speed.`
  }),
  (ctx) => ({
    question: `Can the final blocker move early in ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `It can move early only if the cleanup route is already open; otherwise it often creates a late lock.`
  }),
  (ctx) => ({
    question: `Why should I compare related levels for ${ctx.gameName}?`,
    answer: `Related levels help you recognize whether Level ${ctx.levelNumber} is using a familiar blocker pattern.`
  }),
  (ctx) => ({
    question: `Is ${ctx.gameName} Level ${ctx.levelNumber} easier after a restart?`,
    answer: `Yes, if the restart focuses on preserving the move that failed during the first attempt.`
  }),
  (ctx) => ({
    question: `What is the final check for ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `Before finishing, check that the board has not lost the lane or slot required by the last clear.`
  }),
  (ctx) => ({
    question: `Can I solve ${ctx.gameName} Level ${ctx.levelNumber} slowly?`,
    answer: `A slow solution is often safer because it lets you confirm each support move before the finish.`
  }),
  (ctx) => ({
    question: `What matters most in ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `The most important thing is preserving the route that allows ${ctx.cleanup.toLowerCase()}`
  }),
  (ctx) => ({
    question: `How should I read ${ctx.gameName} Level ${ctx.levelNumber}?`,
    answer: `Read it from the final route backward, then choose opening moves that protect that route.`
  })
];

export const beginnerAdvicePool: PhraseBuilder[] = [
  (ctx) => `For beginners, ${ctx.gameName} Level ${ctx.levelNumber} is best approached by slowing down and finding the move that creates space before chasing a clear.`,
  (ctx) => `New players should treat ${ctx.gameName} Level ${ctx.levelNumber} as a setup puzzle: open the board, protect one backup option, then finish calmly.`,
  (ctx) => `If you are learning ${ctx.gameName}, Level ${ctx.levelNumber} is a good reminder that the safest opening is usually better than the fastest opening.`,
  (ctx) => `Beginner progress on ${ctx.gameName} Level ${ctx.levelNumber} improves when every early move supports the final cleanup route.`,
  (ctx) => `For an easier run, start ${ctx.gameName} Level ${ctx.levelNumber} by checking which blocker controls the most future moves.`,
  (ctx) => `A beginner-friendly plan for ${ctx.gameName} Level ${ctx.levelNumber} is to avoid one-way moves until the board has enough recovery space.`,
  (ctx) => `When ${ctx.gameName} Level ${ctx.levelNumber} feels crowded, beginners should move pieces that increase options instead of pieces that only look clearable.`,
  (ctx) => `The simplest way to learn ${ctx.gameName} Level ${ctx.levelNumber} is to keep asking whether the current move helps the final path.`,
  (ctx) => `For first attempts, solve ${ctx.gameName} Level ${ctx.levelNumber} in two phases: make space, then run the finish.`,
  (ctx) => `Beginners should not worry about speed on ${ctx.gameName} Level ${ctx.levelNumber}; clean sequencing matters more.`,
  (ctx) => `A safe beginner route through ${ctx.gameName} Level ${ctx.levelNumber} protects the board from early traps caused by ${ctx.mistake}.`,
  (ctx) => `If you are stuck, restart ${ctx.gameName} Level ${ctx.levelNumber} and preserve the space that disappeared during the failed attempt.`,
  (ctx) => `For ${ctx.gameName} Level ${ctx.levelNumber}, beginners should focus on visible blockers first and avoid disturbing the final lane too soon.`,
  (ctx) => `The early lesson in ${ctx.gameName} Level ${ctx.levelNumber} is simple: do not spend the only flexible move before the route is clear.`,
  (ctx) => `Beginners can make ${ctx.gameName} Level ${ctx.levelNumber} easier by keeping the board open rather than trying to solve every piece immediately.`,
  (ctx) => `A practical beginner habit for ${ctx.gameName} Level ${ctx.levelNumber} is to pause before each move and name the space it protects.`,
  (ctx) => `In ${ctx.gameName} Level ${ctx.levelNumber}, beginners should prioritize moves that make the next move easier to see.`,
  (ctx) => `The most reliable beginner advice for ${ctx.gameName} Level ${ctx.levelNumber} is to preserve options until the main blocker is handled.`,
  (ctx) => `New players should use ${ctx.gameName} Level ${ctx.levelNumber} to practice reading the end of the board before starting the opening.`,
  (ctx) => `For ${ctx.gameName} Level ${ctx.levelNumber}, the beginner goal is not perfection; it is avoiding the early move that closes the whole board.`
];

export const advancedStrategyPool: PhraseBuilder[] = [
  (ctx) => `Advanced players should map ${ctx.gameName} Level ${ctx.levelNumber} from the final route backward, then choose opening moves that preserve that route.`,
  (ctx) => `A stronger strategy for ${ctx.gameName} Level ${ctx.levelNumber} is to delay the tempting clear until it unlocks two future moves instead of one.`,
  (ctx) => `For advanced play, treat ${ctx.gameName} Level ${ctx.levelNumber} as a timing puzzle built around ${ctx.mechanic}.`,
  (ctx) => `The high-level route in ${ctx.gameName} Level ${ctx.levelNumber} depends on moving the blocker only after support space is secure.`,
  (ctx) => `Experienced players can improve ${ctx.gameName} Level ${ctx.levelNumber} by identifying the move that controls the final three actions.`,
  (ctx) => `An advanced solution for ${ctx.gameName} Level ${ctx.levelNumber} keeps optionality alive until the board is ready to collapse into the finish.`,
  (ctx) => `In ${ctx.gameName} Level ${ctx.levelNumber}, advanced planning means refusing clears that make the endgame narrower.`,
  (ctx) => `The deeper strategy in ${ctx.gameName} Level ${ctx.levelNumber} is to separate blocker removal from cleanup timing.`,
  (ctx) => `Advanced players should use ${ctx.gameName} Level ${ctx.levelNumber} to practice reading consequences after two or three moves.`,
  (ctx) => `A precise route through ${ctx.gameName} Level ${ctx.levelNumber} protects the recovery lane until ${ctx.cleanup.toLowerCase()}`,
  (ctx) => `For ${ctx.gameName} Level ${ctx.levelNumber}, expert control comes from spending temporary space only when it will reopen quickly.`,
  (ctx) => `The advanced mistake to avoid in ${ctx.gameName} Level ${ctx.levelNumber} is creating progress that cannot be converted into a finish.`,
  (ctx) => `High-value moves in ${ctx.gameName} Level ${ctx.levelNumber} create new routes without removing the safest backup option.`,
  (ctx) => `An advanced read of ${ctx.gameName} Level ${ctx.levelNumber} starts by deciding which lane or slot must never be blocked.`,
  (ctx) => `For cleaner execution, use ${ctx.gameName} Level ${ctx.levelNumber} to stage the final sequence before touching the risky blocker.`,
  (ctx) => `Advanced strategy in ${ctx.gameName} Level ${ctx.levelNumber} means turning each setup move into a guaranteed follow-up.`,
  (ctx) => `The best advanced line in ${ctx.gameName} Level ${ctx.levelNumber} avoids ${ctx.mistake} while keeping the finish flexible.`,
  (ctx) => `Strong players should compare ${ctx.gameName} Level ${ctx.levelNumber} with nearby hard levels to recognize repeated blocker timing.`,
  (ctx) => `In ${ctx.gameName} Level ${ctx.levelNumber}, the advanced route favors controlled space over immediate board changes.`,
  (ctx) => `For advanced players, ${ctx.gameName} Level ${ctx.levelNumber} is about using the opening to make the final cleanup almost automatic.`
];

function stableHash(value: string) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return Math.abs(hash >>> 0);
}

function pickBuilders<T>(
  pool: T[],
  count: number,
  seed: string,
  stride = 7
) {
  const start = stableHash(seed) % pool.length;
  const picked: T[] = [];

  for (let offset = 0; picked.length < count && offset < pool.length * 2; offset += 1) {
    const item = pool[(start + offset * stride) % pool.length];

    if (item && !picked.includes(item)) {
      picked.push(item);
    }
  }

  return picked;
}

function seed(context: VariationContext, scope: string) {
  return `${context.gameName}:${context.levelNumber}:${context.mechanic}:${scope}`;
}

export function buildWalkthroughSummary(context: VariationContext) {
  return pickBuilders(walkthroughSummaryPool, 1, seed(context, "summary"))[0](
    context
  );
}

export function buildStepSequence(context: VariationContext) {
  const stepPool: PhraseBuilder[] = [
    (ctx) => `${ctx.opening} In ${ctx.gameName} Level ${ctx.levelNumber}, this creates the first safe route.`,
    (ctx) => `${ctx.blocker} This keeps ${ctx.gameName} Level ${ctx.levelNumber} from losing its backup space.`,
    (ctx) => `Before the finish, check that ${ctx.gameName} Level ${ctx.levelNumber} still has a recovery move available.`,
    (ctx) => `${ctx.cleanup} Use this only when the support moves are ready in ${ctx.gameName} Level ${ctx.levelNumber}.`,
    (ctx) => `Stabilize ${ctx.gameName} Level ${ctx.levelNumber} by moving the piece that limits the most future options.`,
    (ctx) => `Use the middle phase of ${ctx.gameName} Level ${ctx.levelNumber} to prepare the final route, not to chase a small clear.`,
    (ctx) => `If ${ctx.gameName} Level ${ctx.levelNumber} starts to close, restore space before touching the final blocker.`,
    (ctx) => `Finish ${ctx.gameName} Level ${ctx.levelNumber} after the board can absorb every remaining move.`
  ];

  return pickBuilders(stepPool, 4, seed(context, "steps"), 3).map((builder) =>
    builder(context)
  );
}

export function buildProTips(context: VariationContext, count = 5) {
  return pickBuilders(proTipPool, count, seed(context, "tips")).map((builder) =>
    builder(context)
  );
}

export function buildCommonMistakes(context: VariationContext, count = 4) {
  return pickBuilders(commonMistakePool, count, seed(context, "mistakes")).map(
    (builder) => builder(context)
  );
}

export function buildFaq(context: VariationContext, count = 4) {
  return pickBuilders(faqPool, count, seed(context, "faq"), 11).map((builder) =>
    builder(context)
  );
}

export function buildBeginnerAdvice(context: VariationContext, count = 3) {
  return pickBuilders(beginnerAdvicePool, count, seed(context, "beginner"), 3).map(
    (builder) => builder(context)
  );
}

export function buildAdvancedStrategy(context: VariationContext, count = 3) {
  return pickBuilders(advancedStrategyPool, count, seed(context, "advanced"), 3).map(
    (builder) => builder(context)
  );
}

export function buildVariationReport(
  beforeDuplicateWarningCount: number,
  afterDuplicateWarningCount: number
) {
  const reductionRate =
    beforeDuplicateWarningCount === 0
      ? 0
      : Number(
          (
            ((beforeDuplicateWarningCount - afterDuplicateWarningCount) /
              beforeDuplicateWarningCount) *
            100
          ).toFixed(2)
        );

  return {
    beforeDuplicateWarnings: beforeDuplicateWarningCount,
    afterDuplicateWarnings: afterDuplicateWarningCount,
    reductionRate
  };
}
