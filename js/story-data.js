export const STORY_DATA = {
  title: "The Portrait's Secret",
  languageLevel: "B1",
  assets: {
    portraitStages: {
      0: "assets/portraits/portrait-dorian-stage-0.webp",
      1: "assets/portraits/portrait-dorian-stage-1.webp",
      2: "assets/portraits/portrait-dorian-stage-2.webp",
      3: "assets/portraits/portrait-dorian-stage-3.webp"
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
    question: "a sentence or request that asks for information",
    future: "the time that will come after now",
    room: "a space inside a building",
    rule: "an instruction about what is allowed or expected"
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
    }
  }
};
