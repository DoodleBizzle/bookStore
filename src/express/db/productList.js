const products = [
  {
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    genreID: "1",
    description:
      "Raskolnikov, a destitute and desperate former student, wanders through the slums of St Petersburg and commits a random murder without remorse or regret. He imagines himself to be a great man, a Napoleon: acting for a higher purpose beyond conventional moral law. But as he embarks on a dangerous game of cat and mouse with a suspicious police investigator, Raskolnikov is pursued by the growing voice of his conscience and finds the noose of his own guilt tightening around his neck. Only Sonya, a downtrodden sex worker, can offer the chance of redemption.",
    format: "Hardcover",
    isbn: "9780143058144",
    cover_url: "/covers/CrimeAndPunishment.png",
    price: 18.99,
    stock: 20,
  },
  {
    title: "Notes from Underground",
    author: "Fyodor Dostoevsky",
    genreID: "1",
    description:
      "Dostoevsky’s most revolutionary novel, Notes from Underground marks the dividing line between nineteenth- and twentieth-century fiction, and between the visions of self each century embodied. One of the most remarkable characters in literature, the unnamed narrator is a former official who has defiantly withdrawn into an underground existence. In complete retreat from society, he scrawls a passionate, obsessive, self-contradictory narrative that serves as a devastating attack on social utopianism and an assertion of man’s essentially irrational nature.",
    format: "Paperback",
    isbn: "9780679734529",
    cover_url: "/covers/NotesFromUnderground.jpg",
    price: 12.99,
    stock: 2,
  },
  {
    title: "The Three-Body Problem",
    author: "Liu Cixin",
    genreID: "3",
    description:
      "Set against the backdrop of Chinas Cultural Revolution, a secret military project sends signals into space to establish contact with aliens. An alien civilization on the brink of destruction captures the signal and plans to invade Earth. Meanwhile, on Earth, different camps start forming, planning to either welcome the superior beings and help them take over a world seen as corrupt, or to fight against the invasion. The result is a science fiction masterpiece of enormous scope and vision.",
    format: "Hardcover",
    isbn: "9780765377067",
    cover_url: "/covers/ThreeBodyProblem.jpg",
    price: 11.99,
    stock: 5,
  },
  {
    title: "The Dark Forest",
    author: "Liu Cixin",
    genreID: "3",
    description:
      "In The Dark Forest, Earth is reeling from the revelation of a coming alien invasion — four centuries in the future. The aliens' human collaborators have been defeated but the presence of the sophons, the subatomic particles that allow Trisolaris instant access to all human information, means that Earth's defense plans are exposed to the enemy. Only the human mind remains a secret.",
    format: "Hardcover",
    isbn: "9780765377081",
    cover_url: "/covers/DarkForest.jpg",
    price: 13.99,
    stock: 4,
  },
  {
    title: "Death's End",
    author: "Liu Cixin",
    genreID: "3",
    description:
      "Cheng Xin, an aerospace engineer from the early 21st century, awakens from hibernation in this new age. She brings with her knowledge of a long-forgotten program dating from the beginning of the Trisolar Crisis, and her very presence may upset the delicate balance between two worlds. Will humanity reach for the stars or die in its cradle?",
    format: "Hardcover",
    isbn: "9780765377104",
    cover_url: "/covers/DeathsEnd.jpg",
    price: 16.99,
    stock: 10,
  },
  {
    title: "Worlds of Exile and Illusion",
    author: "Ursula LeGuin",
    genreID: "3",
    description:
      "Ursula K. Le Guin is one of the greatest science fiction writers and many times the winner of the Hugo and Nebula Awards. Her career as a novelist was launched by the three novels contained in Worlds Of Exile And Illusion. These novels, Rocannon's World, Planet Of Exile, and City Of Illusions, are set in the same universe as Le Guin's ground-breaking classic, The Left Hand Of Darkness.",
    format: "Paperback",
    isbn: "9780312862114",
    cover_url: "/covers/WorldsOfIllusion.jpg",
    price: 12.99,
    stock: 8,
  },
  {
    title: "Frankenstein",
    author: "Mary Shelley",
    genreID: "2",
    description:
      "Obsessed with creating life itself, Victor Frankenstein plunders graveyards for the material to fashion a new being, which he shocks into life with electricity. But his botched creature, rejected by Frankenstein and denied human companionship, sets out to destroy his maker and all that he holds dear. Mary Shelley's chilling Gothic tale was conceived when she was only eighteen, living with her lover Percy Shelley near Byron's villa on Lake Geneva. It would become the world's most famous work of horror fiction, and remains a devastating exploration of the limits of human creativity.",
    format: "Paperback",
    isbn: "9780141439471",
    cover_url: "/covers/Frankenstein.jpg",
    price: 14.99,
    stock: 18,
  },
  {
    title: "Dracula",
    author: "Bram Stoker",
    genreID: "2",
    description:
      "A true masterwork of storytelling, Dracula has transcended generation, language, and culture to become one of the most popular novels ever written. It is a quintessential tale of suspense and horror, boasting one of the most terrifying characters ever born in literature: Count Dracula, a tragic, night-dwelling specter who feeds upon the blood of the living, and whose diabolical passions prey upon the innocent, the helpless, and the beautiful.",
    format: "Paperback",
    isbn: "9780393970128",
    cover_url: "/covers/Dracula.jpg",
    price: 15.99,
    stock: 6,
  },
  {
    title: "The Eye of the World",
    author: "Robert Jordan",
    genreID: "4",
    description:
      "The Wheel of Time turns and Ages come and go, leaving memories that become legend. Legend fades to myth, and even myth is long forgotten when the Age that gave it birth returns again. In the Third Age, an Age of Prophecy, the World and Time themselves hang in the balance. What was, what will be, and what is, may yet fall under the Shadow.",
    format: "Paperback",
    isbn: "9780812511819",
    cover_url: "/covers/EyeOfTheWorld.jpg",
    price: 12.99,
    stock: 5,
  },
  {
    title: "Thinking Fast and Slow",
    author: "Daniel Kahneman",
    genreID: "5",
    description:
      "In the highly anticipated Thinking, Fast and Slow, Kahneman takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think. System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical. Kahneman exposes the extraordinary capabilities—and also the faults and biases—of fast thinking, and reveals the pervasive influence of intuitive impressions on our thoughts and behavior. The impact of loss aversion and overconfidence on corporate strategies, the difficulties of predicting what will make us happy in the future, the challenges of properly framing risks at work and at home, the profound effect of cognitive biases on everything from playing the stock market to planning the next vacation—each of these can be understood only by knowing how the two systems work together to shape our judgments and decisions.",
    format: "Paperback",
    isbn: "9780374275631",
    cover_url: "/covers/ThinkingFast.jpg",
    price: 13.99,
    stock: 10,
  },
];

module.exports = products;
