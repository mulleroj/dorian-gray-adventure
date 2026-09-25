export const STORY_DATA = {
  title: "The Portrait's Secret",
  languageLevel: "B1",
  assets: {
    portraitStages: {
      0: "assets/portraits/portrait-dorian-stage-0.webp",
      1: "assets/portraits/portrait-dorian-stage-1.webp",
      2: "assets/portraits/portrait-dorian-stage-2.webp"
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
      status: "in-preparation",
      available: false,
      firstScene: null,
      requiresCompletedChapters: ["chapter-2"],
      requiresStoryFacts: ["sibylRelationship", "sibylOutcome", "c2FinalResponse"],
      teacherNotes: {
        literaryBasis: "The approved Chapter III blueprint follows Wilde's 1891 Chapters IX to XI.",
        adaptation: "Only the technical foundation exists. Chapter III scenes and final B1 prose are not implemented.",
        goals: [],
        vocabulary: [],
        discussion: [],
        scenes: [],
        decisions: [],
        canonAndAlternatives: "The three Sibyl outcomes will remain short conditional variants around one shared spine when Chapter III is implemented."
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
    explanation: "a reason or description that makes something clear"
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
    }
  }
};
