export const STORY_DATA = {
  title: "The Portrait's Secret",
  languageLevel: "B1",
  assets: {
    portraitStages: {
      0: "assets/portraits/portrait-dorian-stage-0.webp",
      1: "assets/portraits/portrait-dorian-stage-1.webp",
      2: "assets/portraits/portrait-dorian-stage-2.webp",
      3: "assets/portraits/portrait-dorian-stage-3.webp",
      4: "assets/portraits/portrait-dorian-stage-4.webp",
      5: "assets/portraits/portrait-dorian-stage-5.webp"
    },
    chapterTwo: {
      characters: {
        sibylStage: {
          src: "assets/portraits/character-sibyl-vane-stage.webp",
          alt: "Sibyl Vane performing in a modest Victorian theatre costume beneath gaslight."
        },
        sibylOffstage: {
          src: "assets/portraits/character-sibyl-vane-offstage.webp",
          alt: "Sibyl Vane in modest everyday Victorian dress in a quiet theatre threshold."
        }
      },
      locations: {
        theatreStage: {
          src: "assets/locations/location-theatre-stage.webp",
          alt: "A small late-Victorian London theatre stage with a dark burgundy curtain, gas footlights, and painted scenery."
        },
        theatreBackstage: {
          src: "assets/locations/location-theatre-backstage.webp",
          alt: "A worn Victorian theatre backstage with timber boards, ropes, scenery flats, a costume rail, and gaslight."
        }
      }
    },
    chapterThree: {
      locations: {
        dorianHouse: {
          src: "assets/locations/location-dorians-house.webp",
          alt: "A refined late-Victorian townhouse interior in soft morning light, with dark wood, green wall panels, and burgundy curtains."
        },
        secretRoom: {
          src: "assets/locations/location-secret-room.webp",
          alt: "An old, dust-softened schoolroom inside a late-Victorian townhouse, with dark wood, books, and a fully covered canvas."
        }
      }
    }
  },
  chapters: [
    {
      id: "chapter-1",
      number: "I",
      title: "The Beautiful Young Man",
      subtitle: "A studio, a portrait, and a dangerous idea.",
      status: "playable",
      available: true,
      firstScene: "c1-opening",
      requiresCompletedChapters: [],
      teacherNotes: {
        literaryBasis: "The chapter is inspired by Dorian's first meeting with Basil Hallward and Lord Henry in Basil's studio.",
        adaptation: "The player's responses and the hidden-canvas route are original interactive additions. They are not presented as Wilde's original wording.",
        goals: [
          "Read a short gothic narrative in accessible B1 English.",
          "Notice how dialogue can influence a character's choices.",
          "Discuss the difference between public reputation and private conscience."
        ],
        vocabulary: ["portrait", "vanity", "fleeting", "influence", "conscience"],
        discussion: [
          "Why might a beautiful person fear the passing of time?",
          "Is Lord Henry offering advice, or trying to control Dorian?"
        ]
      }
    },
    {
      id: "chapter-2",
      number: "II",
      title: "The Actress",
      subtitle: "A theatre, a promise, and the cost of loving an idea.",
      status: "playable",
      available: true,
      firstScene: "c2-theatre-lights",
      requiresCompletedChapters: ["chapter-1"],
      teacherNotes: {
        literaryBasis: "This chapter adapts the movement from Dorian's theatre visits and engagement to Sibyl Vane's final performance, using Wilde's Chapter IV to VIII as the literary frame.",
        adaptation: "The nine-scene route, the player's four decision points, and the living alternatives are original interactive additions. The canonical branch states the novel's consequence without reproducing Wilde's wording.",
        goals: [
          "Follow a multi-scene relationship arc in accessible B1 English.",
          "Compare admiration for a performance with attention to a person.",
          "Discuss how public reputation and private responsibility can pull in different directions.",
          "Distinguish a canonical event from clearly labelled interactive alternatives."
        ],
        vocabulary: ["actress", "performance", "devotion", "engagement", "consequence", "grief", "estranged", "respectful"],
        discussion: [
          "When does admiration become a way of ignoring a real person?",
          "Which response after the final performance protects Sibyl's agency most clearly?",
          "Why does the canonical outcome remain separate from the two alternative outcomes?"
        ],
        scenes: [
          { title: "The Theatre in the Evening", focus: "Return from Basil's studio to the theatre and carry Chapter I continuity forward." },
          { title: "Prince Charming", focus: "Meet Sibyl through the names and roles the theatre gives her." },
          { title: "Many Heroines", focus: "Notice the difference between a collection of roles and one person's life." },
          { title: "Two Stories About Sibyl", focus: "Choose whether to tell Basil and Henry a beautiful story or defend Sibyl as a person." },
          { title: "When the Curtain Falls", focus: "Hear Sibyl's own voice before the engagement becomes public." },
          { title: "A Promise in Public", focus: "Watch private devotion become a public promise." },
          { title: "The Night of Romeo and Juliet", focus: "Read the final performance as the point where the ideal and the person separate." },
          { title: "After the Curtain", focus: "Choose Dorian's immediate response to Sibyl's last performance." },
          { title: "The Morning After", focus: "Resolve the canonical or alternative consequence without reopening the arc." }
        ],
        decisions: [
          "Decision I: admire Sibyl's roles or ask about Sibyl herself.",
          "Decision II: tell a beautiful public story or defend the private person.",
          "Decision III: listen to Sibyl, stay inside the dream, or make a grand promise.",
          "Decision IV: judge the performance, stay and listen, or ask for time."
        ],
        canonAndAlternatives: "Role-first admiration plus a cruel public response resolves to dead-canonical. The other routes resolve to alive-estranged or alive-together; neither alternative is presented as Wilde's original plot.",
        contentWarning: "Only the canonical aftermath shows a factual, non-graphic death consequence. The warning appears after the route is resolved and offers continue, skip sensitive description, or pause without changing the save."
      }
    },
    {
      id: "chapter-3",
      number: "III",
      title: "The Changing Portrait",
      subtitle: "A secret room, a visible consequence, and a new influence.",
      status: "playable",
      available: true,
      firstScene: "c3-morning-quiet",
      requiresCompletedChapters: ["chapter-2"],
      requiresStoryFacts: ["sibylRelationship", "sibylOutcome", "c2FinalResponse"],
      teacherNotes: {
        literaryBasis: "The approved Chapter III blueprint follows Wilde's 1891 Chapters IX to XI.",
        adaptation: "The nine-scene spine, player choices, and living Sibyl continuities are interactive B1 extensions. They are not presented as Wilde's original wording or plot.",
        continuity: "dead-canonical carries grief and responsibility without repeating the death; alive-estranged carries distance; alive-together carries closeness under pressure. defendedBasil, Henry history, and the earlier portrait response alter short variants rather than creating separate routes.",
        goals: [
          "Describe a secret and explain why it is being kept.",
          "Distinguish privacy from dishonesty.",
          "Express suspicion and uncertainty in a difficult conversation.",
          "Describe responsibility without claiming simple causation.",
          "Compare a public image with a private reality.",
          "Accept, question, or resist another person's influence."
        ],
        vocabulary: ["secret", "hide", "reveal", "cover", "lock", "key", "private", "public", "trust", "suspicion", "doubt", "responsibility", "excuse", "consequence", "grief", "ashamed", "afraid", "honest", "distant", "influence", "escape", "expression", "witness", "room", "rule", "promise"],
        discussion: [
          "Is hiding the portrait the same as hiding the truth?",
          "Does privacy become dishonesty when another person is harmed?",
          "Why is Basil dangerous to Dorian even though he wants to help him?",
          "Can someone change if nobody can see the consequences?",
          "Can Dorian be responsible without being the sole cause of every consequence?",
          "Which is more powerful in this chapter: the key, the screen, or the book?",
          "Does Henry control Dorian, or does Dorian use Henry's ideas to control himself?",
          "How do the alive-estranged and alive-together routes change the meaning of secrecy?"
        ],
        comprehension: [
          "Why does Basil visit Dorian at the beginning of the chapter?",
          "What does Basil notice about Dorian's way of speaking and feeling?",
          "Why does Dorian not want Basil to see the portrait?",
          "What does the screen hide, and what does it reveal about Dorian's fear?",
          "Why is the old schoolroom a meaningful place for the portrait?",
          "Which rules does Dorian create around the secret?",
          "How does Henry offer Dorian an escape from responsibility?",
          "What is the difference between hiding an object and hiding the truth?"
        ],
        scenes: [
          { title: "Morning Without an Answer", focus: "Begin after Chapter II with the portrait as a private pressure and Basil's arrival approaching." },
          { title: "Basil at Breakfast", focus: "Answer a worried friend without turning Basil into a judge or teacher." },
          { title: "What Basil Wants to Know", focus: "Make trust and friendship the emotional problem before the screen is noticed." },
          { title: "The Portrait Behind the Screen", focus: "Choose whether to face the image, show the cover, or name danger without revealing the face." },
          { title: "The Face That Answers", focus: "Read the existing Stage 2 warning without unlocking a new visual state too early." },
          { title: "The Room With a Key", focus: "Move the covered portrait into the old schoolroom and atomically unlock Stage 3." },
          { title: "Rules Around the Secret", focus: "Establish the locked-room rules and the difference between privacy and deception." },
          { title: "The Book That Was Waiting", focus: "Receive Henry's note and yellow-bound book after the portrait is locked." },
          { title: "A Book for the Next Life", focus: "Close Chapter III on the contrast between the key and the book, ready for Chapter IV." }
        ],
        decisions: [
          "Decision I: speak plainly, repeat Henry's explanation, or ask Basil for trust.",
          "Decision II: face the image alone, let Basil see the cover, or name the danger without showing the face.",
          "Decision III: move the portrait alone, tell Basil there is a private reason, or delay while keeping the key.",
          "Decision IV: accept the book, question it, or use it as an escape."
        ],
        canonAndAlternatives: "Basil's visit, the screened portrait, the old schoolroom, and the yellow-bound book follow the canonical Chapters IX to XI. Player replies, partial disclosure, and living Sibyl outcomes are clearly marked interactive extensions; alive-estranged and alive-together are not Wilde's original plot."
      }
    },
    {
      id: "chapter-4",
      number: "IV",
      title: "A Life of Pleasure",
      subtitle: "Repeated choices become a way of life.",
      status: "playable",
      available: true,
      firstScene: "c4-years-begin",
      requiresCompletedChapters: ["chapter-3"],
      requiresStoryFacts: ["portraitLocation", "portraitStageUnlock", "yellowBookResponse", "basilSuspicion", "sibylOutcome"],
      teacherNotes: {
        literaryBasis: "The chapter is grounded in Wilde's 1891 Chapter XI, while Chapter XII remains the boundary for the future Basil confrontation in Chapter V.",
        adaptation: "The long time compression, four player decisions, living Sibyl routes, derived behaviour profile, and universal Stage 4 event are interactive adaptations. They are not presented as Wilde's original wording or plot.",
        continuity: "Yellow-book response, Sibyl outcome, Basil suspicion, and the derived behaviour profile change short conditional prose inside one shared spine. No new persistent facts or parallel routes are created.",
        goals: [
          "Describe habits and influence over a long period of time.",
          "Distinguish rumours and observations from evidence.",
          "Compare public appearance with private consequence.",
          "Discuss how reputation can differ from character.",
          "Explain how repeated choices can become a pattern without becoming a simple moral score."
        ],
        vocabulary: ["rumour", "habit", "influence", "reputation", "appearance", "evidence", "invitation", "avoid", "compare", "unchanged", "private", "public", "consequence", "behaviour", "distance"],
        discussion: [
          "Is pleasure a problem, or is escape the problem?",
          "When does a habit become part of identity?",
          "Can rumours harm someone even when they are unproven?",
          "Is public reputation the same as character?",
          "Why does Dorian keep looking at the portrait?",
          "Is a charming public image evidence of innocence?"
        ],
        comprehension: [
          "Why does Dorian keep returning to the locked room?",
          "What do people observe, and what do they only guess?",
          "Why does his young face make some people doubt rumours?",
          "Why is Stage 4 a result of a pattern rather than one choice?",
          "How does the yellow book change from an idea into a habit?",
          "How does Dorian's public life protect him and isolate him at the same time?",
          "What does Basil know, and what does he still not know?",
          "How does the ending prepare the next chapter without beginning the confrontation?"
        ],
        scenes: [
          { title: "The Years Begin", focus: "Show the yellow book and the locked-room key becoming habits after a few months." },
          { title: "The Book Becomes a Habit", focus: "Compress several years of reading, returning, and separating public appearance from private evidence." },
          { title: "A House Open to the World", focus: "Use a social evening to show why Dorian's unchanged beauty still protects his public image." },
          { title: "Whispers at the Edge of the Room", focus: "Introduce uncertain rumours and social distance without turning reputation into proof." },
          { title: "A Pleasure for Forgetting", focus: "Reduce the aesthetic catalogue to one decision about how beauty is used." },
          { title: "The Locked Room, Again", focus: "Make the repeated return to the Stage 3 portrait a private ritual before the universal event." },
          { title: "The Face in the Mirror", focus: "Apply the shared Stage 4 milestone after years, choices, concealment, and repeated returns." },
          { title: "An Invitation Withheld", focus: "Show accumulated social distance and interpret it through the derived behaviour profile." },
          { title: "The Door Before the Next Chapter", focus: "End with Basil's announced concern and pressure before, but not during, the Chapter V confrontation." }
        ],
        decisions: [
          "Decision I: share the evening, shape the evening, or use charm as a shield.",
          "Decision II: ask what was seen, calmly deflect, or joke about the rumour.",
          "Decision III: share the music, control the memory, or use beauty as a shield.",
          "Decision IV: name the change, control the comparison, or cover the portrait and return."
        ],
        canonAndAlternatives: "Wilde's Chapter XI supplies the long-term yellow-book influence, unchanged appearance, aesthetic life, rumours, and social pressure. The compressed time span, four decisions, living Sibyl continuities, derived behaviour profile, and Stage 4 event are interactive additions; Chapter XII remains future Chapter V material."
      }
    },
    {
      id: "chapter-5",
      number: "V",
      title: "The Confrontation",
      subtitle: "A private truth becomes a witnessed truth.",
      status: "playable",
      available: true,
      firstScene: "c5-fog-at-the-door",
      requiresCompletedChapters: ["chapter-4"],
      requiresStoryFacts: ["portraitLocation", "portraitStageUnlock", "basilSuspicion", "sibylOutcome", "yellowBookResponse"],
      requiresStoryFactValues: { portraitLocation: "locked-schoolroom", portraitStageUnlock: "stage-4" },
      teacherNotes: {
        literaryBasis: "This chapter adapts Oscar Wilde's 1891 Chapters XII and XIII: Basil confronts Dorian, sees the portrait, urges him to change, and dies in the canonical plot. Chapter XIV remains outside this chapter.",
        adaptation: "The ten-scene shared spine, four decisions, Basil's surviving alternatives, the finite outcome resolver, and the Stage 5 witness milestone are interactive adaptations. Alive-separated and alive-helping are not Wilde's canonical plot.",
        continuity: "Sibyl's outcome, the yellow book, Basil's suspicion, and the derived Chapter IV behaviour profile alter short prose only. They never create alternate scene chains or change the Basil outcome rules.",
        goals: [
          "Distinguish rumour from evidence.",
          "Describe accusation, denial, and responsibility.",
          "Notice how a witness can change a conversation without solving it.",
          "Discuss blame, persuasion, boundaries, and consequences.",
          "Separate Wilde's canonical event from interactive alternatives."
        ],
        vocabulary: ["rumour", "evidence", "deny", "accuse", "reputation", "witness", "reveal", "recognise", "responsibility", "blame", "threat", "boundary", "consequence", "separate", "help", "survive", "truth"],
        comprehension: [
          "Why does Basil confront Dorian?",
          "Why does he initially doubt the rumours?",
          "What had Basil actually seen before entering the room?",
          "Why does Dorian show him the portrait?",
          "What does Basil understand after seeing it?",
          "What does Basil ask Dorian to do?",
          "How does Dorian respond to responsibility?",
          "Which endings are canonical and which are interactive?"
        ],
        discussion: [
          "Is seeing evidence the same as understanding a person?",
          "Why does Dorian want Basil to see the portrait?",
          "Can Basil help after seeing the truth?",
          "When does blame become avoidance?",
          "Does knowing a secret create responsibility?",
          "Should an adaptation allow Basil to survive?",
          "What is the difference between a boundary and control?"
        ],
        scenes: [
          { title: "Fog at the Door", focus: "Meet Basil before the reveal and establish what he does not yet know." },
          { title: "What People Say", focus: "Separate broad rumours from proof without reproducing a scandal catalogue." },
          { title: "Answer Basil", focus: "Choose whether to ask for evidence, defend reputation, or attack the gossip." },
          { title: "I Will Show You the Truth", focus: "Move deliberately from rumours toward evidence without making the transition violent." },
          { title: "The Locked Room", focus: "Choose how honestly to prepare Basil before the universal reveal." },
          { title: "Basil Sees", focus: "Unlock Stage 5 as Basil witnesses the accumulated damage already held by the portrait." },
          { title: "Basil Asks for Change", focus: "Hear Basil's appeal before Dorian answers it." },
          { title: "After the Truth", focus: "Choose whether to listen, shift blame, or reject Basil's judgement." },
          { title: "The Final Response", focus: "Accept limited help, end the conversation, or threaten the witness without sensational wording." },
          { title: "After the Door", focus: "Resolve the canonical or interactive outcome and close Chapter V without beginning Chapter VI." }
        ],
        decisions: [
          "Decision I: ask what Basil actually saw, defend the public name, or attack the gossip.",
          "Decision II: warn before the door, challenge Basil to look, or admit partial truth.",
          "Decision III: listen and answer, blame the portrait and Basil, or reject his judgement.",
          "Decision IV: accept limited help, end the conversation, or silence the witness."
        ],
        canonAndAlternatives: "Canonical: Basil confronts Dorian, sees the portrait, urges change, and dies in Wilde's plot. Interactive alternatives: alive-separated, alive-helping, and the player's four decisions. The alternatives are not presented as Wilde's canon.",
        contentWarning: "Only the dead-canonical ending uses a warning. The transition is restrained and non-graphic; continue, skip the marked transition, or pause without changing the saved outcome."
      }
    },
    {
      id: "chapter-6",
      number: "VI",
      title: "The Final Choice",
      subtitle: "Change may begin now, but the past cannot be undone.",
      status: "in-preparation",
      available: false,
      requiresCompletedChapters: ["chapter-5"],
      requiresStoryFacts: [
        "basilOutcome",
        "portraitStageUnlock",
        "sibylOutcome",
        "sibylRelationship",
        "c2FinalResponse",
        "yellowBookResponse"
      ],
      requiresStoryFactValues: { portraitStageUnlock: "stage-5" }
    }
  ],
  glossary: {
    portrait: "a painting of a person, especially of their face",
    studio: "a room where an artist works",
    canvas: "a strong cloth used by artists for painting",
    rare: "not common or easy to find",
    fleeting: "lasting for only a short time",
    vanity: "too much pride in your own appearance or abilities",
    influence: "the power to change what someone thinks or does",
    conscience: "the part of your mind that tells you whether an action feels right or wrong",
    devotion: "great love, loyalty, or care for someone or something",
    unease: "a feeling of worry or discomfort",
    warning: "something that tells you about possible danger or trouble",
    actress: "a woman who performs in plays",
    performance: "a show in which someone acts for an audience",
    engagement: "an agreement to marry in the future",
    consequence: "a result that follows an action",
    grief: "deep sadness after a loss",
    estranged: "no longer close to someone",
    respectful: "showing care for another person's dignity",
    reality: "the world as it truly is, not only as we imagine it",
    theatre: "a building where plays are performed",
    audience: "the people watching a performance",
    applause: "the sound made by people clapping after a performance",
    role: "a character played by an actor",
    heroine: "a female main character in a story or play",
    illusion: "an idea or appearance that is not fully real",
    perfect: "without mistakes or faults",
    romance: "a story or relationship involving love",
    reputation: "what people generally think about someone",
    promise: "words that say you will do something",
    scandal: "an event that shocks or upsets the public",
    ordinary: "normal and not special",
    pretend: "to act as if something is true when it is not",
    distant: "not close in space or feeling",
    costume: "clothes worn by an actor for a role",
    explanation: "a reason or description that makes something clear",
    secret: "something kept hidden from other people",
    hide: "to put something where it cannot easily be seen",
    reveal: "to show something that was hidden",
    cover: "something placed over an object to hide or protect it",
    lock: "a device that keeps a door closed until it is opened with a key",
    key: "a small object used to open a lock",
    private: "belonging only to one person or a small group",
    public: "known or open to many people",
    trust: "the belief that someone is honest and will not harm you",
    suspicion: "a feeling that something may be wrong or hidden",
    doubt: "a feeling of not being sure",
    responsibility: "the duty to deal with the results of your actions",
    excuse: "a reason given to explain or defend an action",
    ashamed: "feeling bad because you believe you have done something wrong",
    afraid: "feeling fear or worry",
    honest: "telling the truth and not trying to deceive someone",
    honesty: "the quality of telling the truth",
    escape: "a way of getting away from something difficult",
    expression: "the look on a person's face that shows a feeling",
    witness: "a person who sees an event happen",
    screen: "a frame or cloth used to hide something from view",
    permission: "the right to do something given by another person",
    truth: "the facts about what really happened",
    evidence: "facts or signs that show something is true",
    dishonesty: "the act of hiding the truth or deceiving someone",
    book: "a set of written pages held together in a cover",
    fascination: "a strong interest in something",
    habit: "something you do often and almost without thinking",
    rumour: "a story that people repeat without knowing if it is true",
    appearance: "the way someone or something looks",
    invitation: "a request to come to an event or place",
    observe: "to watch carefully and notice details",
    avoid: "to stay away from something difficult or unwanted",
    compare: "to look at two things and notice how they are alike or different",
    unchanged: "remaining the same and not altered",
    season: "one part of the year, such as spring or winter",
    beauty: "the quality of being pleasing to look at or experience",
    memory: "something you remember from the past",
    ritual: "an action repeated in the same way over time",
    recognisable: "easy to know because it is familiar",
    human: "belonging to or showing the qualities of people",
    history: "events that happened in the past",
    message: "information sent from one person to another",
    concern: "a feeling of worry about something",
    boundary: "a limit that shows what is private or allowed",
    distance: "a feeling of being separate or not close to someone",
    behaviour: "the way a person acts",
    question: "a sentence or request that asks for information",
    future: "the time that will come after now",
    room: "a space inside a building",
    rule: "an instruction about what is allowed or expected",
    deny: "to say that something is not true",
    accuse: "to say that someone has done something wrong",
    blame: "to say that someone is responsible for a problem",
    threat: "words or actions that show possible danger",
    help: "to give support to someone",
    survive: "to continue to live after danger or difficulty",
    separate: "to move apart or stop being together",
    recognise: "to know someone or something because it is familiar",
    fog: "a thick cloud close to the ground that makes it hard to see",
    birthday: "the day each year when a person was born",
    young: "having lived for only a small number of years",
    locked: "closed with a lock so that it cannot be opened freely",
    concealment: "the act of keeping something hidden",
    gossip: "talk about other people that may not be true",
    dangerous: "able to cause harm or trouble",
    door: "a movable part of a wall that opens an entrance",
    privacy: "the right to keep personal matters away from other people",
    harm: "physical or emotional damage",
    supernatural: "not explained by ordinary natural rules",
    damage: "harm that makes something less whole or safe",
    fear: "the feeling of being afraid",
    forgiveness: "the decision to stop being angry about a wrong",
    judge: "to form an opinion about someone or something",
    conversation: "a talk between two or more people",
    silence: "the absence of sound or speech",
    unresolved: "not finished or settled",
    dead: "no longer alive",
    support: "help or encouragement given to someone",
    loss: "the fact of no longer having someone or something",
    hidden: "kept where other people cannot see it",
    change: "the act or result of becoming different",
    answer: "something said or written in reply to a question",
    listen: "to pay attention to what someone says"
  },
  scenes: {
    "c1-opening": {
      chapterId: "chapter-1",
      kind: "opening",
      eyebrow: "Chapter I · The Beautiful Young Man",
      title: "A Quiet Studio",
      location: "Basil Hallward's studio",
      paragraphs: [
        "The summer evening is warm, but Basil Hallward's studio feels cool and still. Tall windows look over a London garden. The smell of paint hangs in the air.",
        "You stand beside a large covered canvas. Basil has asked you to wait before seeing it. He says the last brushstroke must be perfect."
      ],
      terms: ["studio", "canvas"],
      nextScene: "c1-basil-studio",
      sourceNote: "New opening written for the game; it establishes the setting of the novel's early studio scenes."
    },
    "c1-basil-studio": {
      chapterId: "chapter-1",
      kind: "narrative",
      eyebrow: "Basil's studio",
      title: "The Painter's Friend",
      location: "Among unfinished paintings",
      paragraphs: [
        "Basil moves around you with quiet devotion. He looks at your face, then at the covered canvas, as if he is afraid that one of them might disappear.",
        "'You have given me something rare,' he says. 'Not only a face. A moment.'",
        "Before you can answer, the door opens. A tall man with a light smile enters without waiting to be invited."
      ],
      terms: ["devotion", "rare"],
      nextScene: "c1-henry-arrives",
      sourceNote: "The friendship between Basil and Dorian is based on the original novel; the dialogue is an original B1 adaptation."
    },
    "c1-henry-arrives": {
      chapterId: "chapter-1",
      kind: "choice",
      eyebrow: "A new voice",
      title: "Lord Henry Wotton",
      location: "The studio doorway",
      paragraphs: [
        "'So this is the famous Dorian Gray,' the stranger says. His eyes rest on you with easy interest. 'Basil has spoken about you as if you were a secret.'",
        "Basil's expression tightens. He does not want Lord Henry to stay. Lord Henry notices this and smiles."
      ],
      prompt: "How do you answer?",
      decisionLabel: "Decision I · Whose voice will you trust?",
      choices: [
        {
          id: "listen-to-henry",
          label: "Listen to Lord Henry.",
          description: "His confidence is strange, but his words make the room feel larger.",
          nextScene: "c1-youth-question",
          effects: { reputation: 1, conscience: -1, portrait: 1, flags: { heardHenry: true } },
          reflection: "You allowed Henry's confidence to enter the room."
        },
        {
          id: "defend-basil",
          label: "Stand beside Basil.",
          description: "The portrait matters more than a clever stranger's performance.",
          nextScene: "c1-youth-question",
          effects: { reputation: 0, conscience: 1, portrait: 0, flags: { defendedBasil: true } },
          reflection: "You made it clear that Basil's trust mattered to you."
        }
      ],
      sourceNote: "Lord Henry, Basil and their relationship are drawn from the novel; the player's response is an original branch."
    },
    "c1-youth-question": {
      chapterId: "chapter-1",
      kind: "choice",
      eyebrow: "The garden door is open",
      title: "The Price of Youth",
      location: "A garden beyond the studio",
      paragraphs: [
        "Lord Henry leads you towards the open garden doors. The air smells of roses. He speaks as if he has discovered a law that nobody else understands.",
        "'Youth is the one thing worth having,' he says. 'It is fleeting. One day you will look in a mirror and see what time has taken.'",
        "The idea follows you like a shadow."
      ],
      terms: ["fleeting", "vanity", "influence"],
      prompt: "What do you do with Henry's idea?",
      decisionLabel: "Decision II · Accept the idea or question it?",
      choices: [
        {
          id: "ask-about-youth",
          label: "Ask him to say more.",
          description: "You want to understand why the thought feels both exciting and frightening.",
          nextScene: "c1-portrait-unveiled",
          effects: { reputation: 1, conscience: -1, portrait: 1, flags: { acceptedIdea: true } },
          reflection: "You asked Henry to continue, giving his idea more space in your mind."
        },
        {
          id: "question-henry",
          label: "Question his certainty.",
          description: "Beauty may fade, but that does not make it the only thing worth protecting.",
          nextScene: "c1-portrait-unveiled",
          effects: { reputation: -1, conscience: 1, portrait: 0, flags: { challengedHenry: true } },
          reflection: "You questioned the charm of a simple answer."
        }
      ],
      sourceNote: "The conversation develops Henry's philosophy from the novel without reproducing its original wording."
    },
    "c1-portrait-unveiled": {
      chapterId: "chapter-1",
      kind: "choice",
      eyebrow: "The covered canvas",
      title: "The Portrait",
      location: "Basil's studio, after sunset",
      paragraphs: [
        "When you return, Basil is standing beside the canvas. He looks worried. Then, with one quick movement, he pulls the cloth away.",
        "The portrait is you — your face, your eyes, the exact expression you wore when you entered. Yet the painted face seems more alive than your own.",
        "For a moment, the room is silent. You understand why Basil was afraid to show it."
      ],
      prompt: "How closely do you face the image?",
      decisionLabel: "Decision III · Look at the portrait or look away?",
      choices: [
        {
          id: "study-portrait",
          label: "Study the portrait.",
          description: "You step closer. If it holds a secret, you want to see it first.",
          nextScene: "c1-hidden-canvas",
          effects: { reputation: 0, conscience: -1, portrait: 1, flags: { studiedPortrait: true } },
          reflection: "You chose to look directly at the image Basil made of you."
        },
        {
          id: "turn-away",
          label: "Step away from it.",
          description: "The likeness is too intimate. You would rather keep your own face to yourself.",
          nextScene: "c1-closing",
          effects: { reputation: 1, conscience: 1, portrait: 0, flags: { avoidedPortrait: true } },
          reflection: "You kept a careful distance from the portrait's gaze."
        }
      ],
      sourceNote: "The portrait's presentation follows the novel's central premise; the player's reaction is an original game branch."
    },
    "c1-hidden-canvas": {
      chapterId: "chapter-1",
      kind: "narrative",
      requires: { flags: ["studiedPortrait"] },
      eyebrow: "A detail in the paint",
      title: "Behind the Curtain",
      location: "The shadowed side of the studio",
      paragraphs: [
        "You move closer. Near the painted mouth there is a small line that does not belong to your expression. It is not a smile. It is a warning.",
        "Basil reaches for the cloth. 'Do not look at it like that,' he says. 'A portrait is only paint.'",
        "But Lord Henry's voice returns to you: youth is fleeting. The thought feels less like a lesson now and more like a promise."
      ],
      terms: ["unease", "warning"],
      nextScene: "c1-closing",
      sourceNote: "The hidden detail is an original interactive extension and is clearly separated from the novel's original events."
    },
    "c1-closing": {
      chapterId: "chapter-1",
      kind: "ending",
      eyebrow: "End of Chapter I",
      title: "A Promise in the Evening",
      location: "Basil's studio",
      paragraphs: [
        "Outside, London is turning dark. Basil covers the portrait again, but the image stays in your mind.",
        "You leave the studio with a new question: if a face can remain young in paint, where will time go instead?",
        "The night does not answer. It only waits."
      ],
      nextScene: null,
      sourceNote: "This ending prepares the next chapter without resolving the novel's final conflict."
    },
    "c2-theatre-lights": {
      chapterId: "chapter-2",
      kind: "opening",
      eyebrow: "Chapter II · The Actress",
      title: "The Theatre in the Evening",
      location: "A small theatre in London",
      paragraphs: [
        "Several evenings have passed since Basil's studio. The covered portrait still waits behind its curtain, but London has given you another place to look: a small theatre glowing at the end of a dark street.",
        "Inside, the audience settles. You hear the orchestra tuning and feel the old question return: is a beautiful moment valuable because it is real, or because it can be admired?"
      ],
      visual: { location: "theatreStage" },
      conditionalText: [
        { when: { flag: "heardHenry" }, text: "Lord Henry's confident voice still shapes the way you watch the room." },
        { when: { flag: "defendedBasil" }, text: "You remember Basil's quiet trust and look for something sincere beneath the theatre's display." },
        { when: { minPortrait: 2 }, text: "The portrait's pressure follows you, even under the theatre lights." }
      ],
      terms: ["theatre", "audience", "portrait"],
      nextScene: "c2-prince-charming",
      sourceNote: "The theatre setting and Dorian's connection to Sibyl Vane are based on Wilde's Chapter IV; the transition from Chapter I is original game continuity."
    },
    "c2-prince-charming": {
      chapterId: "chapter-2",
      kind: "choice",
      eyebrow: "Behind the stage door",
      title: "Prince Charming",
      location: "The theatre foyer",
      paragraphs: [
        "The manager tells you about the young actress who plays the lead. He calls her Juliet, Ophelia, Rosalind, and a dozen other names before he finally says her own: Sibyl Vane.",
        "To the theatre, she is a collection of roles. To you, she is beginning to become a person."
      ],
      terms: ["actress", "role", "performance"],
      prompt: "What do you want to know first?",
      decisionLabel: "Decision I · The role or the person?",
      choices: [
        {
          id: "admire-the-roles",
          label: "Ask about the roles she plays.",
          description: "The names of her heroines make the evening feel larger and more beautiful.",
          nextScene: "c2-many-heroines",
          effects: { reputation: 1, conscience: -1, portrait: 1, flags: { c2RoleFirst: true } },
          reflection: "You first admired the heroines Sibyl could become on stage."
        },
        {
          id: "ask-about-sibyl",
          label: "Ask about Sibyl herself.",
          description: "The roles matter, but you want to hear the name of the woman who plays them.",
          nextScene: "c2-many-heroines",
          effects: { conscience: 1, flags: { c2PersonSeen: true } },
          reflection: "You asked for Sibyl's own story, not only the theatre's story about her."
        }
      ],
      sourceNote: "Sibyl's stage names and Dorian's first attraction to her acting adapt Wilde's theatre chapters; the question is an original branch."
    },
    "c2-many-heroines": {
      chapterId: "chapter-2",
      kind: "narrative",
      eyebrow: "A changing gallery",
      title: "Many Heroines",
      location: "The theatre balcony",
      paragraphs: [
        "From the balcony, you watch Sibyl become one heroine after another. Each voice is different. Each movement seems exact. The audience applauds the illusion, and you understand why the manager speaks of her as if she belongs to the stage.",
        "Yet between scenes, Sibyl's face is quiet. The woman who leaves the stage is not exactly the woman who entered it."
      ],
      visual: { location: "theatreStage", character: "sibylStage" },
      conditionalText: [
        { when: { flag: "c2RoleFirst" }, text: "You collect the names of the heroines in your mind, as if the list could explain your feeling." },
        { when: { flag: "c2PersonSeen" }, text: "You notice the pause between the roles and wonder what Sibyl needs when nobody is applauding." }
      ],
      terms: ["heroine", "illusion", "audience", "devotion"],
      nextScene: "c2-tell-basil-henry",
      sourceNote: "The contrast between Sibyl's roles and her offstage life is a B1 adaptation of Wilde's theatre motif, not a quotation."
    },
    "c2-tell-basil-henry": {
      chapterId: "chapter-2",
      kind: "choice",
      eyebrow: "The next afternoon",
      title: "Two Stories About Sibyl",
      location: "Basil's studio",
      paragraphs: [
        "Basil sees the change in you before you speak. Lord Henry sees it too, and asks for a story. You could give them the shining version: a perfect actress, a perfect romance, a perfect new subject for conversation.",
        "Or you could say that Sibyl is tired after the performance, that she has a family, and that a stage name cannot contain a whole life."
      ],
      terms: ["perfect", "romance", "reputation"],
      prompt: "Which story do you tell?",
      decisionLabel: "Decision II · Public ideal or private person?",
      choices: [
        {
          id: "tell-beautiful-story",
          label: "Tell the beautiful story.",
          description: "You describe Sibyl through her gifts and make the romance sound larger than ordinary life.",
          nextScene: "c2-offstage-sibyl",
          effects: { reputation: 1, conscience: -1, portrait: 1, flags: { c2PublicIdealisation: true } },
          reflection: "You turned Sibyl's life into a beautiful story for Basil and Henry."
        },
        {
          id: "defend-the-person",
          label: "Defend the person behind the roles.",
          description: "You tell them that Sibyl deserves privacy, rest, and a voice of her own.",
          nextScene: "c2-offstage-sibyl",
          effects: { reputation: -1, conscience: 1, flags: { c2PublicPersonhood: true } },
          reflection: "You insisted that Sibyl was more than the story her admirers wanted."
        }
      ],
      sourceNote: "The scene adapts Dorian's reports about Sibyl to Basil and Lord Henry; the alternative emphasis on personhood is an original game extension."
    },
    "c2-offstage-sibyl": {
      chapterId: "chapter-2",
      kind: "choice",
      eyebrow: "When the audience leaves",
      title: "When the Curtain Falls",
      location: "A quiet street beyond the theatre",
      paragraphs: [
        "Sibyl walks beside you without her stage voice. She speaks about her mother, her brother, and the small rooms behind the theatre. Nothing she says sounds like a grand speech, and that makes it difficult to keep the evening inside a dream.",
        "She asks what you love: the woman beside you, or the feeling you carry away after watching her perform."
      ],
      visual: { character: "sibylOffstage" },
      terms: ["devotion", "reality", "respectful"],
      prompt: "How do you answer Sibyl?",
      decisionLabel: "Decision III · Listen, imagine, or promise?",
      choices: [
        {
          id: "listen-to-her-life",
          label: "Listen to her life.",
          description: "You let Sibyl finish. Her ordinary details matter as much as her extraordinary roles.",
          nextScene: "c2-engagement",
          effects: { conscience: 1, flags: { c2RespectfulPromise: true, c2EngagementAnnounced: true } },
          reflection: "You listened to Sibyl as a person before answering her feeling."
        },
        {
          id: "stay-inside-the-dream",
          label: "Stay inside the dream.",
          description: "You speak about the heroines and the magic of the stage, keeping the ordinary world outside.",
          nextScene: "c2-engagement",
          effects: { reputation: 1, conscience: -1, portrait: 1, flags: { c2RoleIdealisation: true, c2EngagementAnnounced: true } },
          reflection: "You protected the beautiful illusion instead of asking it to become ordinary."
        },
        {
          id: "make-grand-promise",
          label: "Make a grand promise.",
          description: "You promise a future bright enough to silence the doubts neither of you has named.",
          nextScene: "c2-engagement",
          effects: { reputation: 1, portrait: 1, flags: { c2GrandPromise: true, c2EngagementAnnounced: true } },
          reflection: "You answered uncertainty with a promise larger than the moment."
        }
      ],
      sourceNote: "Sibyl's offstage voice and the engagement adapt Wilde's Chapter V; the three responses are original interactive choices."
    },
    "c2-engagement": {
      chapterId: "chapter-2",
      kind: "narrative",
      eyebrow: "A promise in public",
      title: "A Promise in Public",
      location: "Outside the theatre",
      paragraphs: [
        "The engagement becomes a public fact. The theatre hears it first, then Basil, then Lord Henry. Each person receives a different version: romance, scandal, or entertainment.",
        "Sibyl takes your hand. For a moment, the promise is private again. Then the theatre bell calls everyone back to their places."
      ],
      conditionalText: [
        { when: { flag: "c2RespectfulPromise" }, text: "Because you listened, Sibyl asks you to remember that a promise must leave room for two people." },
        { when: { flag: "c2RoleIdealisation" }, text: "Because you kept the dream alive, the promise feels like the final scene of a perfect play." },
        { when: { flag: "c2GrandPromise" }, text: "Your grand promise sounds convincing in public, even though it has not yet met an ordinary morning." }
      ],
      terms: ["engagement", "promise", "scandal", "ordinary"],
      nextScene: "c2-final-performance",
      sourceNote: "The public engagement follows Wilde's Chapter V, while the conditional reflections make the player's earlier attitude visible."
    },
    "c2-final-performance": {
      chapterId: "chapter-2",
      kind: "narrative",
      eyebrow: "Romeo and Juliet",
      title: "The Night of Romeo and Juliet",
      location: "The theatre stage",
      paragraphs: [
        "Sibyl enters as Juliet. The audience waits for the magic you have described so often. But tonight her voice is different. She is no longer hiding inside the role; the feeling she has for you has changed the way she can pretend.",
        "The lines arrive slowly. The stage looks smaller than it did before. When the curtain falls, the applause is thin and uncertain."
      ],
      visual: { location: "theatreStage", character: "sibylStage" },
      conditionalText: [
        { when: { flag: "c2RoleFirst" }, text: "You search for the heroine you admired, and the search makes the woman before you seem suddenly distant." },
        { when: { flag: "c2PersonSeen" }, text: "You recognise the risk of loving an image: Sibyl has given you a truth that the performance could never give." }
      ],
      terms: ["performance", "applause", "pretend", "distant"],
      nextScene: "c2-backstage-choice",
      sourceNote: "Sibyl's final performance of Romeo and Juliet and Dorian's shock adapt Wilde's Chapter VII; the narration is newly written for B1 readers."
    },
    "c2-backstage-choice": {
      chapterId: "chapter-2",
      kind: "choice",
      eyebrow: "After the curtain",
      title: "After the Curtain",
      location: "The theatre backstage",
      paragraphs: [
        "Backstage, Sibyl waits without her costume. She knows the performance was poor. She also knows why: she has stopped borrowing the feelings of other heroines because she is living inside her own.",
        "The next words will decide whether you hear her explanation or punish her for breaking the image you loved."
      ],
      visual: { location: "theatreBackstage", character: "sibylOffstage" },
      terms: ["costume", "explanation", "consequence"],
      prompt: "What do you do now?",
      decisionLabel: "Decision IV · The response that follows",
      choices: [
        {
          id: "judge-the-performance",
          label: "Judge the performance.",
          description: "You speak with cruelty because the actress failed to protect the dream you wanted.",
          nextScene: "c2-the-morning-after",
          effects: { reputation: 1, conscience: -2, portrait: 1, storyFacts: { c2FinalResponse: "cruel" }, flags: { c2FinalCruel: true } },
          reflection: "You judged Sibyl for losing the performance that first attracted you."
        },
        {
          id: "stay-and-listen",
          label: "Stay and listen.",
          description: "You let Sibyl explain what has changed, even though her truth unsettles you.",
          nextScene: "c2-the-morning-after",
          effects: { reputation: -1, conscience: 1, storyFacts: { c2FinalResponse: "listen" }, flags: { c2FinalListen: true } },
          reflection: "You stayed long enough to hear Sibyl's truth instead of correcting it."
        },
        {
          id: "ask-for-time",
          label: "Ask for time.",
          description: "You refuse an immediate verdict and leave the conversation open, though not easy.",
          nextScene: "c2-the-morning-after",
          effects: { portrait: 1, storyFacts: { c2FinalResponse: "delay" }, flags: { c2FinalDelay: true } },
          reflection: "You postponed the verdict, leaving the promise uncertain rather than pretending certainty."
        }
      ],
      sourceNote: "The confrontation after Sibyl's performance adapts Wilde's Chapter VII; the three responses are original alternatives."
    },
    "c2-the-morning-after": {
      chapterId: "chapter-2",
      kind: "ending",
      eyebrow: "End of Chapter II",
      title: "The Morning After",
      location: "London, the following morning",
      paragraphs: [
        "Morning enters the city without asking what happened in the theatre. The streets are ordinary. The portrait is not visible, but you feel its silence waiting for the next truth.",
        "This is the end of Sibyl's arc in the game. The next chapter, when written, will begin after this consequence rather than reopening the question of what happened to her."
      ],
      conditionalText: [
        { when: { storyFact: { key: "sibylOutcome", value: "dead-canonical" } }, text: "The news is clear: Sibyl Vane is dead. The consequence is stated plainly, without a method or a graphic description." },
        { when: { storyFact: { key: "sibylOutcome", value: "dead-canonical" } }, text: "Lord Henry treats the news as another story, but you cannot make it into a performance. Grief is now part of what you carry.", sensitive: true },
        { when: { storyFact: { key: "sibylOutcome", value: "alive-estranged" } }, text: "Sibyl is alive, but the promise has ended. She chooses distance from the theatre of your admiration and begins to make a life outside it." },
        { when: { storyFact: { key: "sibylOutcome", value: "alive-together" } }, text: "Sibyl is alive. She agrees to continue only with clear boundaries: her work, her voice, and her ordinary life must remain her own." }
      ],
      terms: ["consequence", "portrait", "grief", "estranged", "ordinary"],
      contentWarning: {
        when: { storyFact: { key: "sibylOutcome", value: "dead-canonical" } },
        title: "A difficult aftermath",
        message: "This canonical ending includes a character's death and grief. The account is factual and non-graphic. You can continue, skip the sensitive description, or pause without changing the outcome.",
        canSkip: true
      },
      nextScene: null,
      sourceNote: "The canonical consequence is based on Wilde's Chapter VIII. The living outcomes are clearly marked interactive alternatives and are not presented as Wilde's original plot."
    },
    "c3-morning-quiet": {
      chapterId: "chapter-3",
      kind: "opening",
      eyebrow: "Chapter III · The Changing Portrait",
      title: "Morning Without an Answer",
      location: "Dorian's house, the morning after Chapter II",
      visual: { location: "dorianHouse" },
      paragraphs: [
        "The morning is quiet, but it does not feel peaceful. London moves outside the windows while the house keeps yesterday's questions inside.",
        "The covered portrait remains where you left it. It is not visible, yet it has become part of the room's silence. The next question is not what happened in the theatre. It is what you will do with what can still be seen.",
        "A servant announces Basil Hallward. For a moment, the old studio friendship seems closer than the locked door of the room above."
      ],
      conditionalText: [
        { when: { storyFact: { key: "sibylOutcome", value: "dead-canonical" } }, text: "You carry grief and responsibility without allowing either one to become a performance." },
        { when: { storyFact: { key: "sibylOutcome", value: "alive-estranged" } }, text: "Sibyl is alive, but distance has become one of the facts of your mornings." },
        { when: { storyFact: { key: "sibylOutcome", value: "alive-together" } }, text: "Sibyl is alive and still close to you, but closeness has made honesty more difficult to avoid." },
        { when: { flag: "defendedBasil" }, text: "Basil's arrival feels like the return of a trust you once chose in his studio." },
        { when: { not: { flag: "defendedBasil" } }, text: "Basil's arrival feels less secure. He is still caring, but you do not know what he will ask for." },
        { when: { minPortrait: 2 }, text: "The covered image presses against your thoughts with the force of an active warning." }
      ],
      terms: ["portrait", "grief", "responsibility", "distant", "honesty"],
      nextScene: "c3-basil-arrives",
      sourceNote: "The breakfast-after-the-aftermath opening is based on Wilde's Chapter IX. Living Sibyl variants are interactive alternatives and are not Wilde's plot."
    },
    "c3-basil-arrives": {
      chapterId: "chapter-3",
      kind: "choice",
      eyebrow: "A worried friend",
      title: "Basil at Breakfast",
      location: "Dorian's breakfast room",
      visual: { location: "dorianHouse" },
      paragraphs: [
        "Basil enters without his usual energy. He looks at you, then at the untouched breakfast, as if both might explain the silence.",
        "He asks where you were, what you know, and whether you have faced what happened after the performance. His voice is gentle, but gentleness does not make the questions easy.",
        "He is not asking for a perfect answer. He wants to know whether the friend he trusted is still speaking to him."
      ],
      conditionalText: [
        { when: { flag: "defendedBasil" }, text: "Basil remembers that you stood beside him once. He does not claim that this gives him every private thought." },
        { when: { any: [{ flag: "heardHenry" }, { flag: "acceptedIdea" }] }, text: "When you begin to explain, Basil recognises some of Henry's confident language in your voice." },
        { when: { not: { storyFact: { key: "sibylOutcome", value: "dead-canonical" } } }, text: "Because Sibyl is alive, Basil asks about the damage and the distance rather than assuming a final loss." }
      ],
      terms: ["trust", "responsibility", "consequence", "excuse", "honest"],
      prompt: "How do you answer Basil's concern?",
      decisionLabel: "Decision I · Answer the friend or manage the room?",
      choices: [
        {
          id: "speak-plainly",
          label: "Speak plainly.",
          description: "You admit that you should have faced the consequences sooner, even if you cannot explain everything.",
          nextScene: "c3-basil-questions",
          effects: { reputation: -1, conscience: 1, portrait: 0, storyFacts: { basilSuspicion: "uneasy" } },
          reflection: "You gave Basil an honest answer, while keeping part of the truth behind your silence."
        },
        {
          id: "repeat-the-explanation",
          label: "Repeat the explanation.",
          description: "You use a calm story about art, feeling, and circumstances to make the morning seem simple.",
          nextScene: "c3-basil-questions",
          effects: { reputation: 1, conscience: -1, portrait: 1, storyFacts: { basilSuspicion: "suspects" } },
          reflection: "You made the room easier to control, but Basil heard Henry's framing inside your explanation."
        },
        {
          id: "ask-for-trust",
          label: "Ask him to trust you.",
          description: "You ask Basil to believe that you are handling the matter, even though you do not reveal what you are hiding.",
          nextScene: "c3-basil-questions",
          effects: { reputation: 0, conscience: 0, portrait: 1, storyFacts: { basilSuspicion: "uneasy" } },
          reflection: "You asked for trust before giving Basil the full truth."
        }
      ],
      sourceNote: "Basil's concern, Dorian's avoidance, and Henry's influence are adapted from Chapter IX; the three responses are interactive additions."
    },
    "c3-basil-questions": {
      chapterId: "chapter-3",
      kind: "narrative",
      eyebrow: "The question behind the question",
      title: "What Basil Wants to Know",
      location: "The breakfast room, before the covered portrait",
      visual: { location: "dorianHouse" },
      paragraphs: [
        "Basil does not move towards the door. He asks what has changed in you. The question is quieter than an accusation, and that makes it harder to refuse.",
        "He remembers the young man in the studio, the friend who could look at a painting and still notice the person beside it. He does not ask you to surrender your privacy. He asks whether trust can move in both directions.",
        "You hear the covered portrait in the silence between his words. Basil follows your eyes."
      ],
      conditionalText: [
        { when: { flag: "defendedBasil" }, text: "Basil says, 'You stood beside me once. I am not asking for every private thought. I am asking whether I may believe what you tell me.'" },
        { when: { not: { flag: "defendedBasil" } }, text: "Basil says, 'Perhaps I no longer know what you want from me. I would rather hear a difficult truth than a beautiful answer.'" },
        { when: { storyFact: { key: "basilSuspicion", value: "suspects" } }, text: "He notices that you are watching the covered area instead of listening to him." },
        { when: { storyFact: { key: "sibylOutcome", value: "dead-canonical" } }, text: "Basil names grief and responsibility without asking you to repeat the circumstances of the loss." },
        { when: { any: [{ storyFact: { key: "sibylOutcome", value: "alive-estranged" } }, { storyFact: { key: "sibylOutcome", value: "alive-together" } }] }, text: "He says that a living person's boundary is not an artistic disappointment that you can explain away." }
      ],
      terms: ["trust", "private", "truth", "grief", "responsibility", "doubt"],
      nextScene: "c3-behind-the-screen",
      sourceNote: "Basil's request for the former Dorian and his concern about Henry are based on Chapter IX. The compact B1 dialogue is original."
    },
    "c3-behind-the-screen": {
      chapterId: "chapter-3",
      kind: "choice",
      eyebrow: "A question about the canvas",
      title: "The Portrait Behind the Screen",
      location: "The covered side of the house",
      visual: { location: "dorianHouse" },
      paragraphs: [
        "Basil notices the screen before you can move. He recognises the shape behind it and asks to see his own work.",
        "The request sounds simple. It is also a door. If Basil steps through it, the room will contain more than a covered canvas. It will contain his eyes and your fear of them.",
        "You must decide what he may see. The painted face is still yours to guard."
      ],
      conditionalText: [
        { when: { flag: "studiedPortrait" }, text: "You remember the small line near the painted mouth. You have already seen the warning, and you do not want Basil to see what you saw." },
        { when: { flag: "avoidedPortrait" }, text: "You avoided the portrait before. Now the covered shape makes avoidance feel like a decision made in front of another person." },
        { when: { storyFact: { key: "basilSuspicion", value: "suspects" } }, text: "Basil is no longer casual about the screen. He waits for an answer." },
        { when: { storyFact: { key: "basilSuspicion", value: "clear" } }, text: "Basil already knows that you are concealing something, but he still leaves the choice of words to you." }
      ],
      terms: ["screen", "reveal", "cover", "permission", "suspicion", "witness"],
      prompt: "How do you respond to Basil's request?",
      decisionLabel: "Decision II · Face the evidence or protect it?",
      choices: [
        {
          id: "face-the-image-alone",
          label: "Face the image alone.",
          description: "You promise to look at the portrait yourself, but you do not allow Basil to come near it.",
          nextScene: "c3-the-expression",
          effects: { conscience: 1, portrait: 1 },
          reflection: "You faced the image, but kept Basil outside the truth it carries."
        },
        {
          id: "let-him-see-the-cover",
          label: "Let him see the cover.",
          description: "You move the screen just enough to show that the portrait is protected, not enough to show the painted face.",
          nextScene: "c3-the-expression",
          effects: { reputation: -1, storyFacts: { basilSuspicion: "suspects" } },
          reflection: "You allowed Basil to see the concealment, but not the face behind it."
        },
        {
          id: "name-the-danger-without-showing-it",
          label: "Name the danger without showing it.",
          description: "You tell Basil that the portrait has become dangerous to you, but you keep the canvas covered.",
          nextScene: "c3-the-expression",
          effects: { conscience: 1, portrait: 1, storyFacts: { basilSuspicion: "clear" } },
          reflection: "You named the danger without giving Basil the image itself."
        }
      ],
      sourceNote: "Dorian blocking Basil from the screened portrait is based on Chapter IX. The partial-disclosure options are game extensions; Basil never sees the changed face here."
    },
    "c3-the-expression": {
      chapterId: "chapter-3",
      kind: "narrative",
      eyebrow: "A face in the half-light",
      title: "The Face That Answers",
      location: "A quiet room beside the covered portrait",
      visual: { location: "dorianHouse" },
      paragraphs: [
        "For a short time you are alone. Basil remains nearby, but he cannot see the face behind the cover.",
        "You look at the portrait. The painted mouth still carries its small warning. The eyes are harder to meet now, not because they have become a new face, but because your explanations have begun to sound like excuses.",
        "The image answers nothing. It only keeps the evidence in the room with you."
      ],
      conditionalText: [
        { when: { minPortrait: 2 }, text: "The existing warning is already clear. This moment gives it a heavier meaning, not a new shape." },
        { when: { not: { minPortrait: 2 } }, text: "The portrait has not reached the strongest visible warning, but the act of hiding it makes the unchanged image more threatening." },
        { when: { flag: "studiedPortrait" }, text: "The line near the painted mouth echoes the first detail you chose to study in Basil's studio." },
        { when: { flag: "avoidedPortrait" }, text: "You are tempted to look away again. The cover makes that easier, but it does not make the question disappear." }
      ],
      terms: ["expression", "evidence", "excuse", "portrait", "warning"],
      nextScene: "c3-the-old-schoolroom",
      sourceNote: "The existing altered expression and the portrait as judgement adapt Chapters IX–X. Stage 3 is deliberately deferred until after the locked-schoolroom event."
    },
    "c3-the-old-schoolroom": {
      chapterId: "chapter-3",
      kind: "choice",
      eyebrow: "The staircase upstairs",
      title: "The Room With a Key",
      location: "The old schoolroom",
      visual: { location: "secretRoom" },
      paragraphs: [
        "You choose the old schoolroom because few people use it. Dust rests on the shelves. The room remembers your childhood, but it does not ask questions.",
        "A rich cover hides the canvas as it is carried upstairs. The key is small enough to hold in one hand. The rule you are making is larger: nobody else may enter without your permission.",
        "The portrait is not safe in the room where friends can find it. You decide what kind of safety you want."
      ],
      conditionalText: [
        { when: { storyFact: { key: "basilSuspicion", value: "clear" } }, text: "Basil already knows that the room contains a private reason. The lie about the door will not be easy to make." },
        { when: { flag: "defendedBasil" }, text: "Because you once protected Basil's work, excluding him now feels like a choice with a personal cost." },
        { when: { any: [{ storyFact: { key: "sibylOutcome", value: "alive-estranged" } }, { storyFact: { key: "sibylOutcome", value: "alive-together" } }] }, text: "The locked room feels especially dangerous because secrecy is also being kept from a living person whose boundaries matter." }
      ],
      terms: ["room", "key", "cover", "private", "permission", "secret"],
      prompt: "Why and how do you hide the portrait?",
      decisionLabel: "Decision III · Turn fear into a rule",
      choices: [
        {
          id: "move-it-alone",
          label: "Move it alone.",
          description: "You carry the decision yourself and tell nobody why the schoolroom must remain locked.",
          nextScene: "c3-rules-of-secrecy",
          effects: { reputation: 1, conscience: -1, portrait: 1, storyFacts: { portraitLocation: "locked-schoolroom", portraitStageUnlock: "stage-3" } },
          reflection: "You turned fear into a private rule and carried the portrait upstairs alone."
        },
        {
          id: "tell-basil-there-is-a-private-reason",
          label: "Tell Basil there is a private reason.",
          description: "You do not show the face, but you admit that the locked room protects something you cannot explain yet.",
          nextScene: "c3-rules-of-secrecy",
          effects: { reputation: -1, conscience: 1, portrait: 1, storyFacts: { portraitLocation: "locked-schoolroom", portraitStageUnlock: "stage-3", basilSuspicion: "clear" } },
          reflection: "You gave Basil a boundary and a reason, though not the complete truth."
        },
        {
          id: "delay-but-keep-the-key",
          label: "Delay, but keep the key.",
          description: "You say that the room will be opened later, while making sure the key remains with you.",
          nextScene: "c3-rules-of-secrecy",
          effects: { portrait: 1, storyFacts: { portraitLocation: "locked-schoolroom", portraitStageUnlock: "stage-3", basilSuspicion: "clear" } },
          reflection: "You postponed the explanation, but the key made the secret real."
        }
      ],
      sourceNote: "The schoolroom, cover, key, frame-makers, and move upstairs are based on Chapter X. The choice framing is an interactive expansion."
    },
    "c3-rules-of-secrecy": {
      chapterId: "chapter-3",
      kind: "narrative",
      requires: { storyFacts: { portraitLocation: "locked-schoolroom", portraitStageUnlock: "stage-3" } },
      eyebrow: "The door is locked",
      title: "Rules Around the Secret",
      location: "The locked old schoolroom",
      visual: { location: "secretRoom" },
      paragraphs: [
        "The portrait is now in the old schoolroom. The key stays with you. The room is private because you have made it private.",
        "For the first time, the image gives back more than a warning. The same Dorian looks from the canvas, but the harmony of the face is reduced. The eyes and mouth carry a harder transition, and a trace of tiredness makes the expression seem older than it should.",
        "There is no grotesque horror in the room. There is only evidence, and the rule you have built around it."
      ],
      conditionalText: [
        { when: { storyFact: { key: "basilSuspicion", value: "uneasy" } }, text: "You call the secret private while Basil has already noticed that something in you is changing." },
        { when: { storyFact: { key: "basilSuspicion", value: "suspects" } }, text: "Basil has noticed the pattern, but he does not know what the portrait shows." },
        { when: { storyFact: { key: "basilSuspicion", value: "clear" } }, text: "Basil does not accuse you. The friendship simply contains an unanswered question." },
        { when: { storyFact: { key: "sibylOutcome", value: "alive-estranged" } }, text: "Sibyl's distance reminds you that privacy can protect a boundary, but it can also hide the harm that made the boundary necessary." },
        { when: { storyFact: { key: "sibylOutcome", value: "alive-together" } }, text: "Because Sibyl is still close to you, the secret feels more costly. Closeness creates an expectation of honesty." }
      ],
      terms: ["lock", "key", "private", "evidence", "expression", "consequence", "dishonesty"],
      nextScene: "c3-henrys-note",
      sourceNote: "The locked room and Dorian's decision to keep the key are based on Chapter X. The explicit rules and first logical Stage 3 description are original game structure."
    },
    "c3-henrys-note": {
      chapterId: "chapter-3",
      kind: "choice",
      requires: { storyFacts: { portraitLocation: "locked-schoolroom", portraitStageUnlock: "stage-3" } },
      eyebrow: "A note downstairs",
      title: "The Book That Was Waiting",
      location: "The drawing room, after the portrait is locked",
      visual: { location: "dorianHouse" },
      paragraphs: [
        "You return downstairs. Henry's note is waiting on the table beside a yellow-bound book. The cover is plain, but the book seems to offer a world where experience can become style.",
        "You begin to read. The portrait is locked above you, and the key is still in your hand. Henry's influence has arrived without Henry needing to enter the house.",
        "The book does not decide what you are. It offers language that may help you avoid the question."
      ],
      conditionalText: [
        { when: { any: [{ flag: "heardHenry" }, { flag: "acceptedIdea" }] }, text: "Henry's old language feels familiar. You know how easily it can make fear sound like freedom." },
        { when: { flag: "challengedHenry" }, text: "You hear the same argument you questioned in the garden, now dressed in a more attractive form." },
        { when: { storyFact: { key: "basilSuspicion", value: "clear" } }, text: "The book offers an elegant escape from the unanswered problem you have left between yourself and Basil." },
        { when: { storyFact: { key: "sibylOutcome", value: "dead-canonical" } }, text: "Henry's voice could turn grief into something to outgrow. You remain responsible for what happened and for how you respond." },
        { when: { any: [{ storyFact: { key: "sibylOutcome", value: "alive-estranged" } }, { storyFact: { key: "sibylOutcome", value: "alive-together" } }] }, text: "Henry could make relationship difficulty sound like an aesthetic story. The people involved would still have to live with it." }
      ],
      terms: ["influence", "escape", "fascination", "question", "responsibility", "key", "portrait"],
      prompt: "What do you do with Henry's influence?",
      decisionLabel: "Decision IV · Accept, question, or escape",
      choices: [
        {
          id: "accept-the-book",
          label: "Accept the book.",
          description: "You let curiosity lead you further into the book, even while the locked room remains above.",
          nextScene: "c3-the-book-on-the-table",
          effects: { reputation: 1, conscience: -1, portrait: 1, storyFacts: { yellowBookResponse: "accepted" } },
          reflection: "You accepted the book's fascination while the key kept the harder truth out of sight."
        },
        {
          id: "question-the-book",
          label: "Question the book.",
          description: "You ask whether an attractive idea can still be an excuse for avoiding responsibility.",
          nextScene: "c3-the-book-on-the-table",
          effects: { reputation: -1, conscience: 1, storyFacts: { yellowBookResponse: "questioned" } },
          reflection: "You questioned the influence, but uncertainty did not make the locked room disappear."
        },
        {
          id: "use-it-as-an-escape",
          label: "Use it as an escape.",
          description: "You choose the book as a place to hide your attention from Basil, Sibyl, and the portrait.",
          nextScene: "c3-the-book-on-the-table",
          effects: { reputation: 1, portrait: 1, storyFacts: { yellowBookResponse: "escape" } },
          reflection: "You used Henry's influence as a shelter from the questions waiting upstairs."
        }
      ],
      sourceNote: "Henry's note, the yellow-bound book's arrival after the locked-room event, and Dorian beginning to read are based on Chapter X. Chapter XI supplies the long-term influence; the three responses only prepare Chapter IV."
    },
    "c3-the-book-on-the-table": {
      chapterId: "chapter-3",
      kind: "ending",
      requires: { storyFacts: { portraitLocation: "locked-schoolroom", portraitStageUnlock: "stage-3" }, resolvedStoryFacts: ["yellowBookResponse"] },
      eyebrow: "End of Chapter III",
      title: "A Book for the Next Life",
      location: "The drawing room, with the schoolroom key",
      visual: { location: "dorianHouse" },
      paragraphs: [
        "The yellow-bound book rests on the table. The key to the old schoolroom rests in your hand. One object offers a story about experience; the other keeps evidence behind a locked door.",
        "You do not know which influence will become stronger. You only know that both are now part of your private life.",
        "The next chapter may begin with the life you choose under their pressure. For tonight, the house is quiet, the portrait is hidden, and the book is open."
      ],
      conditionalText: [
        { when: { any: [{ storyFact: { key: "basilSuspicion", value: "suspects" } }, { storyFact: { key: "basilSuspicion", value: "clear" } }] }, text: "Basil's unanswered suspicion remains in the house even after he has gone." },
        { when: { storyFact: { key: "yellowBookResponse", value: "accepted" } }, text: "The book's fascination is the hook: a beautiful explanation can become a long habit." },
        { when: { storyFact: { key: "yellowBookResponse", value: "questioned" } }, text: "The hook is ambivalence. You can question the book and still feel its influence waiting for another evening." },
        { when: { storyFact: { key: "yellowBookResponse", value: "escape" } }, text: "The hook is avoidance. The book gives you somewhere to look while the locked portrait keeps looking back." },
        { when: { storyFact: { key: "sibylOutcome", value: "dead-canonical" } }, text: "Sibyl's death remains part of the responsibility you carry; it is not reopened or made into a new scene." },
        { when: { storyFact: { key: "sibylOutcome", value: "alive-estranged" } }, text: "Sibyl remains alive and distant. Her status is not changed by the room, the key, or the book." },
        { when: { storyFact: { key: "sibylOutcome", value: "alive-together" } }, text: "Sibyl remains alive and close under pressure. The secret is still yours, and the relationship is not a reward." }
      ],
      terms: ["book", "key", "influence", "private", "portrait", "future", "consequence"],
      nextScene: null,
      sourceNote: "The yellow-book hook follows Chapter X's immediate sequence; the contrast between public beauty, the locked room, and long-term influence is supported by Chapters X–XI. The Chapter IV handoff is original game architecture."
    },
    "c4-years-begin": {
      chapterId: "chapter-4",
      kind: "opening",
      eyebrow: "Chapter IV · A Life of Pleasure",
      title: "The Years Begin",
      location: "Dorian's house, a few months later",
      visual: { location: "dorianHouse" },
      paragraphs: [
        "A few months later, the yellow-bound book is no longer a novelty. It lies near your chair, open at different pages, as if it has learned the shape of the room.",
        "The key to the locked schoolroom is still yours. The portrait remains private upstairs. You still look young, and the house still receives the face that other people remember.",
        "You have not made one great decision about the book or the key. You have simply returned to both of them often enough for them to become part of your days."
      ],
      conditionalText: [
        { when: { storyFact: { key: "yellowBookResponse", value: "accepted" } }, text: "The book's ideas still feel elegant and attractive. They turn experience into a language that sounds almost like wisdom." },
        { when: { storyFact: { key: "yellowBookResponse", value: "questioned" } }, text: "You still argue with the book in the margins of your thoughts, but you keep returning to its language." },
        { when: { storyFact: { key: "yellowBookResponse", value: "escape" } }, text: "You use the book deliberately when a difficult thought comes too close. Its pages give you somewhere else to look." },
        { when: { storyFact: { key: "sibylOutcome", value: "dead-canonical" } }, text: "Sibyl remains part of memory, grief, and responsibility. You do not repeat the method of her death; you carry the fact of the loss." },
        { when: { storyFact: { key: "sibylOutcome", value: "alive-estranged" } }, text: "Sibyl is alive and independent. She is no longer waiting for you, and her life has learned to continue at a distance." },
        { when: { storyFact: { key: "sibylOutcome", value: "alive-together" } }, text: "Sibyl remains part of your life, but years have changed the relationship. Closeness now includes distance, boundaries, and questions you avoid." }
      ],
      terms: ["book", "key", "portrait", "private", "habit", "influence", "grief", "responsibility", "distant", "boundary"],
      nextScene: "c4-the-book-as-habit",
      sourceNote: "Wilde's Chapter XI supplies the long-term book influence and unchanged appearance; the compressed opening and Sibyl continuities are interactive adaptations."
    },
    "c4-the-book-as-habit": {
      chapterId: "chapter-4",
      kind: "narrative",
      eyebrow: "A long influence",
      title: "The Book Becomes a Habit",
      location: "Rooms that change around you",
      visual: { location: "dorianHouse" },
      paragraphs: [
        "Over the next few years, the book appears in different rooms and beside different evenings. Sometimes you read it with attention. Sometimes you open it only to postpone another thought.",
        "You kept returning to its pages. You used to think that an idea was powerful because it was beautiful. You had begun to notice that a beautiful idea could also become an excuse.",
        "Although your public face remains young and calm, the locked schoolroom keeps another kind of evidence upstairs. The distance between what people see and what you know becomes easier to maintain, and harder to explain."
      ],
      conditionalText: [
        { when: { storyFact: { key: "yellowBookResponse", value: "accepted" } }, text: "The book's influence feels like a philosophy you can carry into any room." },
        { when: { storyFact: { key: "yellowBookResponse", value: "questioned" } }, text: "Questioning the book has not stopped its influence. An argument can remain a habit even after the answer is uncertain." },
        { when: { storyFact: { key: "yellowBookResponse", value: "escape" } }, text: "When the private evidence becomes difficult, the book offers a familiar way to look away." }
      ],
      terms: ["influence", "habit", "appearance", "unchanged", "evidence", "public", "private", "avoid", "consequence", "question"],
      nextScene: "c4-house-open",
      sourceNote: "The repeated reading and long time compression adapt Wilde's Chapter XI into a short B1-friendly narrative transition."
    },
    "c4-house-open": {
      chapterId: "chapter-4",
      kind: "choice",
      eyebrow: "Decision I · The public face",
      title: "A House Open to the World",
      location: "Dorian's house, a refined evening",
      visual: { location: "dorianHouse" },
      paragraphs: [
        "Your house is open again. Music moves through the rooms, glasses catch the light, and conversation gathers around the face that has not changed since Basil painted it.",
        "People enjoy your company because you make an evening feel complete. Your beauty protects the public story: a young man can be admired, forgiven, or simply believed more easily than a tired one.",
        "The pleasure is real, but it does not explain what happens upstairs. You decide how much of the evening will belong to other people and how much will be arranged around your control."
      ],
      terms: ["appearance", "reputation", "public", "private", "influence", "consequence"],
      prompt: "How do you use the evening?",
      decisionLabel: "Decision I · Welcome, perform, or protect yourself",
      choices: [
        {
          id: "share-the-evening",
          label: "Invite people into a shared experience.",
          description: "You let the music, conversation, and attention move between people instead of keeping the room under your control.",
          nextScene: "c4-whispers",
          effects: { reputation: 1, conscience: 1, portrait: 0 },
          reflection: "You treated pleasure as something that could connect people, not only protect your image."
        },
        {
          id: "shape-the-evening",
          label: "Shape every detail as a performance.",
          description: "You arrange the rooms, the conversation, and your own expression until the evening seems effortless.",
          nextScene: "c4-whispers",
          effects: { reputation: 1, conscience: 0, portrait: 1 },
          reflection: "You made the evening beautiful by turning every detail into a controlled presentation."
        },
        {
          id: "charm-as-shield",
          label: "Use charm to keep difficult questions away.",
          description: "You answer curiosity with wit and warmth, making it pleasant for everyone to look somewhere else.",
          nextScene: "c4-whispers",
          effects: { reputation: 1, conscience: -1, portrait: 1 },
          reflection: "You used charm as a shield, and the room accepted the protection."
        }
      ],
      sourceNote: "Dorian's social life and aesthetic reputation adapt Wilde's Chapter XI; the three ways of using the evening are original interactive choices."
    },
    "c4-whispers": {
      chapterId: "chapter-4",
      kind: "choice",
      eyebrow: "Decision II · What people say",
      title: "Whispers at the Edge of the Room",
      location: "Dorian's house, after his twenty-fifth year",
      visual: { location: "dorianHouse" },
      paragraphs: [
        "After his twenty-fifth year, the room begins to change around you. A conversation stops when you approach. Someone leaves early. An invitation is mentioned, then not explained.",
        "You hear a story that may be false, but the uncertainty is already changing the room. People have observed a pattern of absences and distance. They have not proved what the pattern means.",
        "Your young face makes some people doubt the rumour. It does not make the rumour impossible, and Reputation is not the same as truth."
      ],
      conditionalText: [
        { when: { storyFact: { key: "basilSuspicion", value: "uneasy" } }, text: "Basil once sensed that something was wrong. The memory is an unease, not a knowledge of the secret." },
        { when: { storyFact: { key: "basilSuspicion", value: "suspects" } }, text: "Basil believed you were deliberately hiding something serious. He still did not know what the secret was." },
        { when: { storyFact: { key: "basilSuspicion", value: "clear" } }, text: "Basil clearly understood that you were concealing a serious secret, but he had not seen the portrait and did not know its truth." }
      ],
      terms: ["rumour", "reputation", "evidence", "appearance", "public", "distance", "invitation", "observe", "truth", "suspicion"],
      prompt: "How do you answer a story that may be false, but is already changing the room?",
      decisionLabel: "Decision II · Observe, manage, or perform",
      choices: [
        {
          id: "ask-what-was-seen",
          label: "Ask what was actually seen.",
          description: "You separate observations from guesses before answering the story.",
          nextScene: "c4-chosen-pleasure",
          effects: { reputation: -1, conscience: 1, portrait: 0 },
          reflection: "You asked for evidence and refused to treat a rumour as a fact."
        },
        {
          id: "calmly-deflect",
          label: "Calmly deflect the question.",
          description: "You manage the social situation without accepting or resolving what the rumour means.",
          nextScene: "c4-chosen-pleasure",
          effects: { reputation: 1, conscience: 0, portrait: 1 },
          reflection: "You kept control of the room without deciding whether the story was true."
        },
        {
          id: "joke-about-rumour",
          label: "Make a joke about the rumour.",
          description: "You turn uncertainty into a performance and give the room an easier story to repeat.",
          nextScene: "c4-chosen-pleasure",
          effects: { reputation: 1, conscience: -1, portrait: 1 },
          reflection: "You made the rumour entertaining, which made its uncertainty easier to ignore."
        }
      ],
      sourceNote: "The uncertain social rumours and distance adapt Wilde's Chapter XI without inventing a detailed crime; the three responses are original interactive choices."
    },
    "c4-chosen-pleasure": {
      chapterId: "chapter-4",
      kind: "choice",
      eyebrow: "Decision III · A later season",
      title: "A Pleasure for Forgetting",
      location: "A later evening in Dorian's house",
      visual: { location: "dorianHouse" },
      paragraphs: [
        "Another season passed. You choose one room instead of a catalogue of rooms, one experience instead of every beautiful object that could be collected.",
        "The question is not whether music, perfume, jewels, or cloth are good or bad. The question is how you use beauty when an inward question refuses to leave.",
        "The house offers many ways to arrange memory. You choose the use that will shape this evening."
      ],
      terms: ["season", "beauty", "memory", "private", "public", "question", "influence"],
      prompt: "What do you do with beauty?",
      decisionLabel: "Decision III · Share, control, or shield",
      choices: [
        {
          id: "share-the-music",
          label: "Share the music.",
          description: "You let another person experience the music with you instead of using it to disappear into your own thoughts.",
          nextScene: "c4-locked-room-again",
          effects: { reputation: 0, conscience: 1, portrait: 0 },
          reflection: "You allowed beauty to become an experience shared with another person."
        },
        {
          id: "control-the-memory",
          label: "Control the memory.",
          description: "You arrange perfume, objects, and the room until an uncertain memory feels like an experiment you can manage.",
          nextScene: "c4-locked-room-again",
          effects: { reputation: 0, conscience: 0, portrait: 1 },
          reflection: "You turned memory into something arranged, measured, and apparently under your control."
        },
        {
          id: "beauty-as-shield",
          label: "Make beauty a shield.",
          description: "You choose jewellery and textiles that make the room impossible to question and your own question easier to avoid.",
          nextScene: "c4-locked-room-again",
          effects: { reputation: 1, conscience: -1, portrait: 1 },
          reflection: "You used visible beauty to protect yourself from an inward question."
        }
      ],
      sourceNote: "The selected music, perfume, objects, jewellery, and textiles compress Wilde's Chapter XI catalogue into one interactive question about use rather than moral value."
    },
    "c4-locked-room-again": {
      chapterId: "chapter-4",
      kind: "choice",
      requires: { storyFacts: { portraitLocation: "locked-schoolroom" } },
      eyebrow: "Decision IV · The private ritual",
      title: "The Locked Room, Again",
      location: "The old schoolroom, after many years",
      visual: { location: "secretRoom" },
      paragraphs: [
        "You return to the old schoolroom after another period of company and music. This is not your first return. You have come many times over the years, always with the key and always with a reason to leave again.",
        "The portrait is still at its logical Stage 3. Your living face remains young; the painted face keeps the evidence you do not show downstairs.",
        "The ritual has become familiar: unlock the door, look at the canvas, decide how much of the comparison you can bear, and choose what to do next."
      ],
      conditionalText: [
        { when: { storyFact: { key: "sibylOutcome", value: "dead-canonical" } }, text: "Memory brings grief and responsibility into the room, but you do not turn Sibyl's death into another performance." },
        { when: { storyFact: { key: "sibylOutcome", value: "alive-estranged" } }, text: "Sibyl's independent life is another reminder that your private rituals do not control other people's boundaries." },
        { when: { storyFact: { key: "sibylOutcome", value: "alive-together" } }, text: "Sibyl's continuing presence makes the locked room harder to call harmless. Closeness makes the hidden evidence more costly." }
      ],
      terms: ["private", "portrait", "unchanged", "evidence", "ritual", "compare", "responsibility", "grief", "boundary"],
      prompt: "How do you meet the portrait?",
      decisionLabel: "Decision IV · Name, control, or cover",
      choices: [
        {
          id: "name-the-change",
          label: "Name one visible change.",
          description: "You look directly and say what is different, without pretending that naming it solves anything.",
          nextScene: "c4-face-in-mirror",
          effects: { reputation: 0, conscience: 1, portrait: 1 },
          reflection: "You looked directly at the evidence and named one change."
        },
        {
          id: "control-the-comparison",
          label: "Control the comparison.",
          description: "You compare the portrait and your living face as an experiment you believe you can manage.",
          nextScene: "c4-face-in-mirror",
          effects: { reputation: 0, conscience: 0, portrait: 1 },
          reflection: "You treated the living face and painted face as an experiment under your control."
        },
        {
          id: "cover-and-return",
          label: "Cover it and return downstairs.",
          description: "You cover the evidence, lock the door, and preserve the public self for another evening.",
          nextScene: "c4-face-in-mirror",
          effects: { reputation: 1, conscience: -1, portrait: 1 },
          reflection: "You covered the evidence and returned to public life before the question could follow you."
        }
      ],
      sourceNote: "The repeated locked-room ritual and the Stage 3 portrait continue the approved Chapter IV blueprint; the three responses are original interactive choices."
    },
    "c4-face-in-mirror": {
      chapterId: "chapter-4",
      kind: "narrative",
      requires: {
        storyFacts: { portraitLocation: "locked-schoolroom" },
        requiredChoiceScenes: ["c4-house-open", "c4-whispers", "c4-chosen-pleasure", "c4-locked-room-again"]
      },
      eyebrow: "The shared consequence",
      title: "The Face in the Mirror",
      location: "The old schoolroom",
      visual: { location: "secretRoom" },
      effects: { storyFacts: { portraitStageUnlock: "stage-4" } },
      paragraphs: [
        "The change does not belong to one click, one evening, or one sentence. It belongs to repeated years, repeated choices, repeated concealment, and repeated returns to this room.",
        "The portrait has reached a harder stage. The eyes and mouth are more watchful. A restrained fatigue touches the face, and some of its harmony has been lost.",
        "The change is still human and recognisably Dorian. It is not grotesque and it is not final. Your living face remains young while the painting keeps the history that your appearance refuses to show.",
        "The Stage 4 image is present as a logical change before its final artwork exists. The room holds the evidence, and the key remains in your hand."
      ],
      conditionalText: [
        { when: { behaviourProfile: "self-examining" }, text: "You have looked for specifics and shared some experiences, but attention does not erase consequence." },
        { when: { behaviourProfile: "divided" }, text: "Public control and private examination have coexisted for years. Neither side has cancelled the other." },
        { when: { behaviourProfile: "pleasure-as-escape" }, text: "Beauty, wit, and concealment have repeatedly helped you avoid difficult questions. Avoidance has still left a record." }
      ],
      terms: ["consequence", "portrait", "evidence", "unchanged", "recognisable", "human", "private", "history", "key"],
      nextScene: "c4-later-invitation",
      sourceNote: "This universal Stage 4 event is original game architecture. It represents accumulated time and behaviour, not a single choice; final Stage 4 artwork remains pending."
    },
    "c4-later-invitation": {
      chapterId: "chapter-4",
      kind: "narrative",
      eyebrow: "Years later",
      title: "An Invitation Withheld",
      location: "Dorian's house, years later",
      visual: { location: "dorianHouse" },
      paragraphs: [
        "Years later, an invitation fails to arrive. At another dinner, a conversation becomes formal and someone excuses himself before the evening is finished.",
        "Not everybody rejects you. Charm still works, and some people prefer the beauty of the public story to the uncertainty of the private one. But a name has disappeared from one circle, and a place at one table is no longer offered.",
        "The reaction is not a legal judgement or proof of a crime. It is the social distance that can grow around a pattern people do not know how to explain."
      ],
      conditionalText: [
        { when: { behaviourProfile: "self-examining" }, text: "You have repeatedly looked for specifics or shared experience, but that attention does not erase the consequences gathering around you." },
        { when: { behaviourProfile: "divided" }, text: "Public control and private examination remain divided inside the same polished evening." },
        { when: { behaviourProfile: "pleasure-as-escape" }, text: "Beauty, wit, and concealment have repeatedly been used to avoid difficult questions, and distance has begun to answer for them." }
      ],
      terms: ["invitation", "distance", "reputation", "appearance", "public", "private", "consequence", "evidence", "rumour"],
      nextScene: "c4-threshold",
      sourceNote: "The withheld invitation and social distance adapt Wilde's Chapter XI; the derived profile changes interpretation, not the shared event or a legal verdict."
    },
    "c4-threshold": {
      chapterId: "chapter-4",
      kind: "ending",
      eyebrow: "End of Chapter IV",
      title: "The Door Before the Next Chapter",
      location: "Dorian's house, before another difficult conversation",
      visual: { location: "dorianHouse" },
      paragraphs: [
        "Years have passed. You still look young, and people still read that face before they read the distance around it.",
        "Upstairs, the Stage 4 portrait remains in the locked schoolroom. It is harder around the eyes and mouth, watchful and tired in a way the living face is not.",
        "Basil has heard enough to want to speak with you. He has sent a message and announced his concern, but he has not seen the portrait, entered the secret room, or witnessed the truth behind the locked door.",
        "You understand that a difficult conversation may be approaching. The door before it is still closed."
      ],
      conditionalText: [
        { when: { behaviourProfile: "self-examining" }, text: "You have tried to look closely at what happened. Looking closely has not made the approaching conversation unnecessary." },
        { when: { behaviourProfile: "divided" }, text: "You have lived between public control and private examination. Basil's message reaches both sides of that life." },
        { when: { behaviourProfile: "pleasure-as-escape" }, text: "You have often used beauty and wit to return to public life. This time, the unanswered question is waiting at the door." },
        { when: { storyFact: { key: "sibylOutcome", value: "dead-canonical" } }, text: "Sibyl remains part of memory, grief, and responsibility; her story is not reopened here." },
        { when: { storyFact: { key: "sibylOutcome", value: "alive-estranged" } }, text: "Sibyl remains alive with an independent life beyond your choices; distance is not a promise that she will return." },
        { when: { storyFact: { key: "sibylOutcome", value: "alive-together" } }, text: "Sibyl remains part of your changing life, with boundaries and ordinary questions that cannot be replaced by a perfect romance." }
      ],
      terms: ["unchanged", "portrait", "private", "public", "consequence", "message", "concern", "distance", "responsibility", "boundary"],
      nextScene: null,
      sourceNote: "Chapter IV ends before Wilde's Chapter XII confrontation. Basil's announced concern is a threshold for future Chapter V, not the confrontation itself."
    },
    "c5-fog-at-the-door": {
      chapterId: "chapter-5",
      kind: "opening",
      eyebrow: "Chapter V · The Confrontation",
      title: "Fog at the Door",
      location: "Dorian's house, late at night",
      paragraphs: [
        "Late at night, cold fog presses against the door of the house. It is the eve of your thirty-eighth birthday, but the house does not feel ready for a celebration.",
        "Basil Hallward has been waiting to speak with you before he leaves London. He has come because rumours, distance, and your silence have become too difficult to ignore.",
        "Your living face still looks young. Upstairs, the Stage 4 portrait remains locked in the old schoolroom. Basil has not seen it, entered the room, or witnessed the truth behind the door."
      ],
      conditionalText: [
        { when: { storyFact: { key: "basilSuspicion", value: "uneasy" } }, text: "Basil has sensed that something is wrong. Unease is not knowledge of the supernatural portrait." },
        { when: { storyFact: { key: "basilSuspicion", value: "suspects" } }, text: "Basil believes you are deliberately hiding something serious. He still does not know about the portrait." },
        { when: { storyFact: { key: "basilSuspicion", value: "clear" } }, text: "Basil knows that the concealment is serious and deliberate. He has not seen the portrait and does not know its truth." }
      ],
      terms: ["fog", "birthday", "concern", "rumour", "young", "portrait", "locked", "witness", "truth", "unease", "suspicion", "concealment"],
      nextScene: "c5-what-people-say",
      sourceNote: "The late-night threshold and Basil's concern adapt the opening movement of Wilde's Chapter XII; Basil's pre-witness knowledge boundary is an explicit game contract."
    },
    "c5-what-people-say": {
      chapterId: "chapter-5",
      kind: "narrative",
      eyebrow: "Before the door",
      title: "What People Say",
      location: "The drawing room, with the fog outside",
      paragraphs: [
        "Basil speaks carefully. People say that serious things have happened around you. They repeat stories about absences, strange visitors, and people who no longer wish to be seen with you.",
        "He does not call the rumours proof. They are stories repeated by people who have seen parts of a pattern, not facts that explain the whole of your life.",
        "Your young face makes the worst stories hard for Basil to believe. He wants truth rather than gossip, but he also wants to believe that the friend he painted is still someone he can reach."
      ],
      conditionalText: [
        { when: { storyFact: { key: "yellowBookResponse", value: "accepted" } }, text: "You can almost hear an elegant idea turning social harm into a permission to remain untouched." },
        { when: { storyFact: { key: "yellowBookResponse", value: "questioned" } }, text: "You remember that an attractive idea can still become an excuse when it avoids responsibility." },
        { when: { storyFact: { key: "yellowBookResponse", value: "escape" } }, text: "The old habit of abstraction offers a polished way to look away from the personal question." },
        { when: { storyFact: { key: "sibylOutcome", value: "dead-canonical" } }, text: "The memory of loss makes the difference between a rumour and a consequence harder to ignore." },
        { when: { storyFact: { key: "sibylOutcome", value: "alive-estranged" } }, text: "Sibyl is alive and independent, but distance has shown that harm can change a relationship without ending a life." },
        { when: { storyFact: { key: "sibylOutcome", value: "alive-together" } }, text: "Sibyl remains part of your life, yet closeness has not removed the need for honesty and boundaries." },
        { when: { behaviourProfile: "self-examining" }, text: "Your recent habit of looking for specifics gives you a language for asking what was actually seen." },
        { when: { behaviourProfile: "divided" }, text: "Public control and private fear meet in the same quiet room." },
        { when: { behaviourProfile: "pleasure-as-escape" }, text: "You know how easily a polished answer can move a conversation away from the person who is asking." }
      ],
      terms: ["rumour", "evidence", "reputation", "appearance", "public", "private", "truth", "gossip", "responsibility", "consequence", "distance", "boundary", "escape"],
      nextScene: "c5-answer-basil",
      sourceNote: "The broad social rumours compress Wilde's Chapter XII without reproducing its long catalogue or inventing detailed crimes."
    },
    "c5-answer-basil": {
      chapterId: "chapter-5",
      kind: "choice",
      eyebrow: "Decision I · Answer Basil",
      title: "Answer Basil",
      location: "The drawing room",
      paragraphs: [
        "Basil looks at you for a long moment. 'I do not believe every story,' he says. 'But I cannot pretend that nothing has changed. What have you actually seen, and what do you only deny because it is unpleasant?'",
        "He asks for an answer, not a performance. The question is whether you will separate evidence from gossip, defend the public name, or attack the person who brought the rumours to your door."
      ],
      terms: ["evidence", "deny", "accuse", "reputation", "truth", "rumour", "question", "public", "gossip", "performance"],
      prompt: "How do you answer Basil's concern?",
      decisionLabel: "Decision I · Evidence, reputation, or attack",
      choices: [
        {
          id: "ask-what-you-actually-saw",
          label: "Ask what he actually saw.",
          description: "You ask Basil to separate evidence from gossip before either of you gives the rumour more power.",
          nextScene: "c5-show-you-the-truth",
          effects: { reputation: -1, conscience: 1, portrait: 0 },
          reflection: "You asked Basil to separate evidence from gossip."
        },
        {
          id: "defend-the-public-name",
          label: "Defend the public name.",
          description: "You protect the appearance that has always made other people believe you are innocent.",
          nextScene: "c5-show-you-the-truth",
          effects: { reputation: 1, conscience: 0, portrait: 0 },
          reflection: "You defended the public name before answering the private question."
        },
        {
          id: "attack-the-gossip",
          label: "Attack the gossip.",
          description: "You accuse Basil of listening to rumours and make his concern sound like a personal insult.",
          nextScene: "c5-show-you-the-truth",
          effects: { reputation: 1, conscience: -1, portrait: 1 },
          reflection: "You attacked the gossip and the person who carried it to you."
        }
      ],
      sourceNote: "The question about evidence is an interactive B1 adaptation of Basil's concern; the three responses are reserved Chapter V choices."
    },
    "c5-show-you-the-truth": {
      chapterId: "chapter-5",
      kind: "narrative",
      eyebrow: "A deliberate decision",
      title: "I Will Show You the Truth",
      location: "The passage toward the old schoolroom",
      paragraphs: [
        "The rumours are no longer enough for either of you. You decide to move the conversation from what people say to what can be seen.",
        "'You wanted to know,' you tell Basil. 'I will show you the truth.' The words are deliberate. They are dangerous because they cannot be taken back, but they are not yet violent.",
        "Basil follows you toward the locked schoolroom. He does not know what waits behind the door, and you do not explain the secret before you reach it."
      ],
      terms: ["rumour", "evidence", "reveal", "truth", "dangerous", "locked", "secret", "door"],
      nextScene: "c5-the-locked-room",
      sourceNote: "Dorian's decision to replace gossip with evidence prepares Wilde's Chapter XII reveal without foreshadowing a weapon or promising violence."
    },
    "c5-the-locked-room": {
      chapterId: "chapter-5",
      kind: "choice",
      eyebrow: "Decision II · The Locked Room",
      title: "The Locked Room",
      location: "The old schoolroom",
      visual: { location: "secretRoom" },
      paragraphs: [
        "The key turns. The old schoolroom is cold and quiet. The portrait stands under its cover, holding the years that your living face refuses to show.",
        "Basil stops at the door. He has not seen the changed portrait. You can warn him, challenge him to look, or admit that your silence has protected harm as well as privacy.",
        "Whatever you say, the cover will be removed. No answer can avoid the reveal now."
      ],
      terms: ["key", "room", "portrait", "cover", "private", "privacy", "harm", "reveal", "truth", "witness"],
      prompt: "What do you say before you open the truth?",
      decisionLabel: "Decision II · Warn, challenge, or admit",
      choices: [
        {
          id: "warn-before-the-door",
          label: "Warn him before the door.",
          description: "You tell Basil that the truth will be difficult, without making him responsible for what he is about to see.",
          nextScene: "c5-basil-sees",
          effects: { conscience: 1 },
          reflection: "You warned Basil that the truth would be difficult."
        },
        {
          id: "challenge-him-to-look",
          label: "Challenge him to look.",
          description: "You ask Basil to judge the evidence for himself, even though you know the room will answer him.",
          nextScene: "c5-basil-sees",
          effects: { portrait: 1 },
          reflection: "You challenged Basil to judge the evidence for himself."
        },
        {
          id: "admit-partial-truth",
          label: "Admit a partial truth.",
          description: "You admit that you have hidden harm and responsibility before you uncover the portrait.",
          nextScene: "c5-basil-sees",
          effects: { reputation: -1, conscience: 1 },
          reflection: "You admitted concealment, harm, and responsibility before the reveal."
        }
      ],
      sourceNote: "The covered canvas and locked schoolroom continue the established visual foundation; all three choices lead to the universal reveal."
    },
    "c5-basil-sees": {
      chapterId: "chapter-5",
      kind: "narrative",
      eyebrow: "The universal witness",
      title: "Basil Sees",
      location: "The old schoolroom, with the portrait uncovered",
      effects: { storyFacts: { portraitStageUnlock: "stage-5" } },
      paragraphs: [
        "You remove the cover. Basil sees the changed portrait. He recognises Dorian, and he recognises his own painting beneath the damage that the years have gathered.",
        "Disbelief gives way to horror, grief, fear, and concern. Basil does not become all-knowing. He sees the portrait and understands the truth it carries, but he does not know every hidden detail of your life.",
        "You give him only a short account: a wish, a portrait, and years hidden behind a young face. You do not explain every supernatural rule. The damage was already there; Basil's gaze witnesses it. The portrait does not transform because he looked at it.",
        "The Stage 5 milestone marks what has been revealed to another person. It does not claim that Basil caused the change."
      ],
      terms: ["cover", "reveal", "portrait", "recognise", "witness", "damage", "grief", "fear", "concern", "truth", "hidden", "supernatural"],
      nextScene: "c5-basil-asks-for-change",
      sourceNote: "Basil's universal witness adapts Wilde's Chapter XII. Stage 5 represents accumulated damage revealed to Basil; his gaze does not cause a transformation."
    },
    "c5-basil-asks-for-change": {
      chapterId: "chapter-5",
      kind: "narrative",
      eyebrow: "Basil's appeal",
      title: "Basil Asks for Change",
      location: "The old schoolroom",
      paragraphs: [
        "Basil looks from the portrait to your living face. He is frightened, but he does not turn the moment into a lesson. He speaks as a friend who has finally seen what you kept from him.",
        "'Face what you have done,' he says. 'Stop hiding behind the room, the portrait, and your appearance. Change while change is still possible.'",
        "He admits that he once idealised you too much. That admission is his own responsibility, not yours. Basil does not promise easy forgiveness, and he does not take responsibility for your choices.",
        "Before you answer, his appeal remains in the room: responsibility is difficult, but the conversation is not over."
      ],
      conditionalText: [
        { when: { storyFact: { key: "sibylOutcome", value: "dead-canonical" } }, text: "His words touch the old loss without repeating its death. Grief can name responsibility, but it cannot repair the past." },
        { when: { storyFact: { key: "sibylOutcome", value: "alive-estranged" } }, text: "He speaks of harm and boundaries. Sibyl is alive, but distance has still become a consequence." },
        { when: { storyFact: { key: "sibylOutcome", value: "alive-together" } }, text: "He speaks of secrecy and emotional distance. Sibyl remains part of your life, but closeness does not cancel responsibility." }
      ],
      terms: ["portrait", "responsibility", "change", "hide", "forgiveness", "blame", "boundary", "distance", "consequence", "grief"],
      nextScene: "c5-after-the-truth",
      sourceNote: "Basil's appeal adapts Wilde's Chapter XIII while keeping him human, limited, and separate from a teacher or therapist role."
    },
    "c5-after-the-truth": {
      chapterId: "chapter-5",
      kind: "choice",
      eyebrow: "Decision III · After the Truth",
      title: "After the Truth",
      location: "The old schoolroom",
      paragraphs: [
        "Basil does not ask you to explain every year. He asks for one honest answer about what you will do now.",
        "The portrait cannot speak for you. Neither can Basil. You can listen, shift responsibility toward the image and the man who painted it, or reject Basil's right to ask for change."
      ],
      terms: ["truth", "responsibility", "blame", "portrait", "judge", "change", "answer", "listen"],
      prompt: "How do you answer after the truth is visible?",
      decisionLabel: "Decision III · Listen, blame, or reject",
      choices: [
        {
          id: "listen-and-answer",
          label: "Listen and answer.",
          description: "You hear Basil's concern and respond without promising redemption or asking him to solve you.",
          nextScene: "c5-final-response",
          effects: { conscience: 1 },
          reflection: "You listened to Basil and answered without promising redemption."
        },
        {
          id: "blame-the-portrait-and-basil",
          label: "Blame the portrait and Basil.",
          description: "You shift responsibility toward the painting, the wish, or Basil's earlier idealisation.",
          nextScene: "c5-final-response",
          effects: { conscience: -1, portrait: 1 },
          reflection: "You shifted responsibility toward the portrait and Basil's idealisation."
        },
        {
          id: "reject-his-judgement",
          label: "Reject his judgement.",
          description: "You deny Basil the right to judge your life or ask you to change.",
          nextScene: "c5-final-response",
          effects: { reputation: 1, conscience: -1, portrait: 1 },
          reflection: "You rejected Basil's right to judge or ask for change."
        }
      ],
      sourceNote: "The responses turn Basil's appeal into the third reserved Chapter V decision without resolving his outcome prematurely."
    },
    "c5-final-response": {
      chapterId: "chapter-5",
      kind: "choice",
      eyebrow: "Decision IV · The final response",
      title: "The Final Response",
      location: "At the door of the old schoolroom",
      paragraphs: [
        "The conversation has reached its final question. Basil has seen the portrait, asked for change, and heard your answer.",
        "What you do now will decide whether he leaves with a broken trust, remains for limited human support, or is threatened into silence."
      ],
      terms: ["conversation", "witness", "change", "help", "survive", "threat", "silence", "boundary", "trust"],
      prompt: "What is your final response to Basil?",
      decisionLabel: "Decision IV · Help, separation, or danger",
      choices: [
        {
          id: "accept-basil-help",
          label: "Accept limited help.",
          description: "You let Basil stay for an honest conversation and accept that support is not the same as forgiveness.",
          nextScene: "c5-after-the-door",
          reflection: "You accepted limited help without claiming that the damage was repaired."
        },
        {
          id: "end-the-conversation",
          label: "End the conversation.",
          description: "You tell Basil to leave and end the relationship rather than continue the difficult exchange.",
          nextScene: "c5-after-the-door",
          reflection: "You ended the conversation and let Basil leave with the trust between you broken."
        },
        {
          id: "silence-the-witness",
          label: "Silence the witness.",
          description: "You make the danger clear: Basil must not speak of what he saw, and you want to prevent him from telling anyone.",
          nextScene: "c5-after-the-door",
          reflection: "You threatened the witness because you wanted to control what he could say."
        }
      ],
      sourceNote: "The final wording communicates coercion and danger without labelling the option as murder or using sensational instruction."
    },
    "c5-after-the-door": {
      chapterId: "chapter-5",
      kind: "ending",
      eyebrow: "End of Chapter V",
      title: "After the Door",
      location: "Dorian's house, after the confrontation",
      paragraphs: [
        "The door closes. The house is quiet again, but the secret is no longer private. Basil has seen the portrait, and the consequences of the conversation remain unresolved.",
        { when: { storyFact: { key: "basilOutcome", value: "dead-canonical" } }, text: "The conversation reaches a breaking point. The narrative pauses before any physical detail is described.", sensitive: true },
        { when: { storyFact: { key: "basilOutcome", value: "dead-canonical" } }, text: "Basil is dead. No procedure, concealment, or investigation follows in this chapter." },
        { when: { storyFact: { key: "basilOutcome", value: "alive-separated" } }, text: "Basil survives and leaves. The trust between you is severely damaged, and the distance between you is now a boundary he has chosen." },
        { when: { storyFact: { key: "basilOutcome", value: "alive-helping" } }, text: "Basil survives and leaves willing to offer limited human support. He does not forgive everything, solve you, or accept responsibility for your choices." },
        "Chapter VI has not begun. The next consequences belong to a future chapter, not to a procedural ending here."
      ],
      conditionalText: [
        { when: { storyFact: { key: "sibylOutcome", value: "dead-canonical" } }, text: "Sibyl's loss remains part of memory and responsibility; it is not described again." },
        { when: { storyFact: { key: "sibylOutcome", value: "alive-estranged" } }, text: "Sibyl remains alive and independent. Her life does not become a promise that distance will disappear." },
        { when: { storyFact: { key: "sibylOutcome", value: "alive-together" } }, text: "Sibyl remains part of your changing life, with boundaries and ordinary questions rather than perfect happiness." }
      ],
      terms: ["door", "secret", "private", "witness", "consequence", "unresolved", "dead", "survive", "support", "trust", "distance", "boundary", "responsibility", "loss"],
      contentWarning: {
        when: { storyFact: { key: "basilOutcome", value: "dead-canonical" } },
        title: "A difficult aftermath",
        message: "This canonical adaptation includes a factual, non-graphic death consequence. You can continue, skip the restrained transition, or pause without changing the saved outcome.",
        canSkip: true
      },
      nextScene: null,
      sourceNote: "Chapter V closes at the immediate consequence and Chapter VI handoff. The canonical death remains factual and non-graphic; Chapter XIV procedural aftermath is outside this implementation."
    }
  }
};
