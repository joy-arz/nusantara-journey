export interface FolkloreStory {
  id: string;
  title: string;
  titleId: string;
  region: string;
  kingdom: string;
  category: 'legend' | 'fable' | 'myth' | 'fairy-tale' | 'origin-story';
  summary: string;
  fullText: string;
  characters: string[];
  moral?: string;
}

export const FOLKLORE_STORIES: FolkloreStory[] = [
  {
    id: "fs001",
    title: "Malin Kundang — The Ungrateful Son",
    titleId: "Malin Kundang",
    region: "West Sumatra",
    kingdom: "Minangkabau",
    category: "legend",
    summary: "A poor boy who becomes rich and famous but abandons his own mother, only to be turned to stone by her tears and prayers.",
    characters: ["Malin Kundang", "Ibu Malin (Mother)", "Siti (Wife)"],
    moral: "Never forget those who raised you with love, no matter how successful you become.",
    fullText: `In a small coastal village on the shores of West Sumatra, there lived a poor widow and her only son, Malin Kundang. Their life was hard — the mother caught fish and grew vegetables to survive, while Malin helped as best he could. But Malin was restless. He dreamed of riches, of a life beyond the village.

One day, a merchant ship anchored at their bay. Malin begged his mother to let him sail away to seek his fortune. With tears in her eyes, his mother agreed. She pressed a small coin into his palm and whispered, "Come back to me, my son. No wealth in this world is worth more than the love between us."

Malin set sail. Years passed — five, then ten, then fifteen. Back in the village, his mother grew thin and frail. She sat each evening at the shore, watching every ship that came, hoping one would bring her son home.

And one day, it did. A magnificent vessel sailed into the bay — gilded sails, polished wood, a crew of a hundred men. On the deck stood a handsome, richly dressed man. Word spread through the village: it was Malin Kundang, now a wealthy merchant lord with a beautiful wife.

His mother rushed to the shore, trembling with joy. "Malin! My son!" she cried, reaching out to embrace him. But Malin looked at this thin, ragged old woman and felt only shame. His beautiful wife was watching. His crew was watching.

"Malin Kundang? I don't know any Malin Kundang," he said coldly. "This woman is a beggar. Remove her from my sight."

His mother stumbled back, her heart shattered. "You are my son," she whispered. "I would know you anywhere." But Malin turned away and ordered his ship to sail.

As the ship moved from the shore, the old woman fell to her knees. She lifted her trembling hands to the sky and wept. "God above," she prayed through her tears, "if this man truly is my son who has forgotten me — then turn him to stone."

The sky darkened. Thunder rolled across the sea. A storm unlike any before crashed down on Malin's magnificent ship. The waves rose as tall as mountains. The crew screamed. The gilded sails were torn to shreds.

And slowly — slowly — Malin Kundang turned to stone. His ship crumbled around him. His wife, his wealth, everything scattered into the storm.

Today, if you visit the beach of Air Manis near Padang in West Sumatra, you can still see the rock formation that the people call Batu Malin Kundang — the Stone of Malin Kundang. It looks, they say, like a man kneeling in regret, forever facing the sea.

Mothers still tell this story to their children by the fire. Not as a curse, but as a reminder: the love that raises you is the greatest treasure you will ever hold.`
  },
  {
    id: "fs002",
    title: "Sangkuriang — The Origin of Tangkuban Perahu",
    titleId: "Sangkuriang",
    region: "West Java",
    kingdom: "Sunda",
    category: "origin-story",
    summary: "The tragic story of a young man who unknowingly falls in love with his own mother, and when rejected, tries to create a boat in a single night, only for the mountain to become his failed vessel.",
    characters: ["Sangkuriang", "Dayang Sumbi (Mother)", "Tumang (Father/Dog)"],
    moral: "Destiny cannot be escaped through deception, and forbidden love brings only destruction.",
    fullText: `Long before the Dutch came, before the kingdoms of Sunda and Mataram, there was a woman of extraordinary beauty named Dayang Sumbi. She lived alone in the forest, weaving cloth and singing to herself. One day, her shuttle fell from the loom and rolled away into the undergrowth.

In desperation, she called out: "Whoever brings me my shuttle — if it is a man, he shall be my husband; if a woman, she shall be my sister!" From the trees stepped a large black dog named Tumang. He carried the shuttle in his gentle mouth. Dayang Sumbi had made a vow, and she kept it. She married Tumang.

In time, she gave birth to a son — Sangkuriang. He grew up strong and clever, always hunting with his dog Tumang in the deep forest. But Tumang was no ordinary dog. He was a cursed prince, and Dayang Sumbi knew this, though she kept it secret.

One day, Sangkuriang chased a deer deep into the forest. He commanded Tumang to help, but Tumang sat still, unwilling to leave the sacred grove. Sangkuriang, furious, killed Tumang and brought his heart home to his mother, claiming it was deer meat.

When Dayang Sumbi realized what had happened — that her son had killed his own father — she was overcome with grief. She struck Sangkuriang on the head with a weaving tool. The wound left a long scar. Then she banished him from her sight.

Sangkuriang wandered for years. He grew into a tall, handsome man. He traveled the length of Java. And one day, following a forest path, he came upon a beautiful woman sitting by a stream.

He fell in love at once. He asked for her hand in marriage.

The woman looked at him carefully — and recognized the scar on his head. It was her son, Sangkuriang. But she said nothing. She knew she could not accept him. She had to find a way to stop the marriage without revealing who she truly was.

She set him an impossible task: "Build me a boat large enough to sail on the lake, and dam the Citarum River — all before sunrise tomorrow. Then I will marry you."

Sangkuriang, whose love had given him supernatural strength, called upon the spirits of the forest. Through the night, the trees fell, the river bent, the wood shaped itself. By the fourth hour before dawn, he was almost finished.

Dayang Sumbi grew desperate. She gathered a great cloth dyed red and spread it across the eastern hills, making the glow look like sunrise. The roosters crowed, fooled by the false light. The spirit helpers scattered.

Sangkuriang ran to the lake and found his work unfinished, his boat incomplete. In rage and heartbreak, he kicked the half-built boat. It flew through the air and landed upside down.

That boat became Tangkuban Perahu — "Overturned Boat" — the volcano that still looms over Bandung today. Its crater, shaped like the hull of a capsized vessel, still steams with the heat of Sangkuriang's grief.`
  },
  {
    id: "fs003",
    title: "Timun Mas — The Golden Cucumber Girl",
    titleId: "Timun Mas",
    region: "Central Java",
    kingdom: "Mataram Kuno",
    category: "fairy-tale",
    summary: "A childless widow is given magical cucumber seeds by a giant who demands her daughter in return — but the girl fights back with enchanted seeds.",
    characters: ["Timun Mas", "Mbok Srini (Mother)", "Buto Ijo (The Green Giant)"],
    moral: "Even the smallest and youngest can triumph over overwhelming evil with cleverness and courage.",
    fullText: `There was once a widow named Mbok Srini who lived alone at the edge of the jungle. She had no children, and her loneliness was like an ache that never faded. Every morning she prayed beneath the old fig tree: "Please — give me a child."

One morning, a shadow fell across her. It was Buto Ijo, the Green Giant — enormous, with teeth like tusks and eyes like lanterns. He had heard her prayer. He held out a cucumber seed wrapped in a banana leaf.

"Plant this seed," he said. "Water it with your tears for seven days. A child will grow inside the cucumber. But when she turns seventeen, you must give her to me. She will be my meal."

Mbok Srini was horrified — but her longing for a child was greater than her fear. She planted the seed, watered it with tears, and on the seventh day, a golden cucumber the size of a melon appeared. She cut it open, and inside, curled like a sleeping jewel, was a beautiful baby girl.

She named her Timun Mas — "Golden Cucumber." The girl grew up bright and brave, and Mbok Srini kept the secret of her origin, dreading the coming day.

When Timun Mas was nearly seventeen, her mother could no longer hide her fear. She told her everything. Together they went to a holy man who gave them four small bags — one filled with cucumber seeds, one with needles, one with salt, one with shrimp paste.

"When Buto Ijo comes," he said, "throw these at him, one by one."

Buto Ijo came at dawn — shaking the earth with each step, his roar splitting the sky. Timun Mas ran into the forest. The giant chased her, crashing through trees like they were grass.

She threw the first bag — cucumber seeds. Instantly, a vast cucumber field grew up behind her, thick with vines, and Buto Ijo was tangled and slowed. But he tore free.

She threw the second bag — needles. The ground erupted into a forest of bamboo spikes. Buto Ijo howled as they pierced his feet. But he pushed through.

She threw the third bag — salt. The ground flooded into a vast, churning sea. Buto Ijo struggled to swim, gasping and cursing. But he kept coming.

She threw the last bag — shrimp paste. The sea turned to scalding brown mud. It swallowed Buto Ijo whole, sucking him down until there was nothing left but a rumble and a burp in the earth.

Timun Mas ran home and found her mother on her knees in prayer. They fell into each other's arms, laughing and weeping. From that day, they were free — a mother and daughter who had faced a monster together and won.`
  },
  {
    id: "fs004",
    title: "Bawang Merah and Bawang Putih",
    titleId: "Bawang Merah dan Bawang Putih",
    region: "Java",
    kingdom: "Mataram Islam",
    category: "fairy-tale",
    summary: "Indonesia's Cinderella — a kind girl and her cruel stepsister compete for fortune, but only the kind-hearted one receives the magical gifts.",
    characters: ["Bawang Putih (White Onion)", "Bawang Merah (Red Onion)", "Stepmother", "Old Woman of the River"],
    moral: "Kindness and honesty are always rewarded; greed and cruelty always punished.",
    fullText: `Once there were two girls who shared the same home but not the same heart. Bawang Putih — "White Onion" — was the daughter of a kind father, gentle as river water and hardworking as the rice farmer. Bawang Merah — "Red Onion" — was her stepsister, spoiled and sharp-tongued as her name.

After Bawang Putih's father died, her stepmother and Bawang Merah treated her like a servant. She cooked, cleaned, fetched water, and worked in the fields while Bawang Merah lounged. But Bawang Putih never complained. She sang while she worked and was kind to every creature she met.

One day, washing clothes at the river, the current swept away her mother's favorite shawl. She wept — it was all she had left of her mother. She waded downstream, searching.

Far along the bank, she found an old woman sitting by a small hut, holding the shawl. The old woman's eyes were kind, though her face was strange and her fingers were twisted.

"I found this," the old woman said. "Will you stay and help me for a few days? My bones ache."

Bawang Putih agreed at once. She cooked, cleaned, and combed the old woman's hair, all without being asked. She sang as she worked. She was careful and loving in everything she did.

After three days, the old woman said: "It is time to go. As a gift, I offer you two pumpkins. Choose one."

Bawang Putih chose the smaller one — it seemed polite. She carried it home.

When she split it open, out poured gold coins, silk cloth, jewels, and spices enough to fill a chest. The family was rich overnight.

Bawang Merah, burning with envy, demanded to know how it happened. Bawang Putih told her everything. The next day, Bawang Merah ran to the river and threw in her own cloth, just to "lose" it. She found the old woman, stayed — but grumbled, did sloppy work, and was rude.

At the end of three days, the old woman offered two pumpkins. Bawang Merah snatched the largest one and ran home without even saying goodbye.

She burst through the door and slammed the pumpkin on the floor.

Out came snakes, scorpions, biting insects, and frogs. Bawang Merah screamed. Her mother screamed. They ran from the house and did not stop running for a very long time.

Bawang Putih lived simply and well, and was never unkind to anyone — not even to those who had been unkind to her.`
  },
  {
    id: "fs005",
    title: "Roro Jonggrang — The Origin of Prambanan",
    titleId: "Roro Jonggrang",
    region: "Central Java",
    kingdom: "Mataram Kuno",
    category: "origin-story",
    summary: "A princess tricks the prince who conquered her kingdom into building a thousand temples in one night — and pays a strange price for her deception.",
    characters: ["Roro Jonggrang", "Bandung Bondowoso", "King Prambanan (Father)"],
    moral: "Deception, even in self-defense, may bring unexpected consequences.",
    fullText: `The kingdom of Prambanan was ruled by a powerful king. His daughter, Roro Jonggrang, was famous across Java for her beauty — graceful, intelligent, and proud as a temple spire.

One day, the kingdom of Pengging, led by Prince Bandung Bondowoso and his father, attacked Prambanan. After a fierce battle, Prambanan fell. Roro Jonggrang's father was killed.

Bandung Bondowoso, who possessed supernatural powers over the earth and spirits, saw the princess and immediately fell in love with her beauty and dignity. He asked for her hand in marriage.

Roro Jonggrang despised him. This was the man who had killed her father and taken her kingdom. But she could not simply refuse — Bandung Bondowoso commanded an army of spirits and human soldiers.

She thought quickly. She would set an impossible condition.

"I will marry you," she said, "if you build me a thousand temples before sunrise tomorrow."

Bandung Bondowoso accepted without hesitation. He called upon the spirits of the earth — legions of invisible workers who could move mountains. Through the night, the ground trembled and thundered as temples rose from the soil one after another.

By the time the moon was at its lowest, nine hundred and ninety-nine temples stood complete. One more remained.

Roro Jonggrang watched in horror from her window. He would succeed. She called her handmaidens and commanded them to pound their rice mortars, making the hollow rhythmic sound of dawn work. She ordered others to scatter flowers and burn incense — the signs of morning.

The roosters, fooled by the sounds and smells, began to crow.

The spirits fled from the light they believed was coming. The last temple was never finished.

Bandung Bondowoso realized he had been tricked. His rage was terrible. He looked at Roro Jonggrang and said: "You have deceived me, and now you yourself shall become the thousandth statue."

And so she was. The princess turned to stone — a tall, beautiful stone figure, frozen forever inside the main temple of the Prambanan complex, her eyes still proud, her posture still dignified.

Today, if you visit Prambanan and look at the central female statue inside the great Shiva temple, the people say that is Roro Jonggrang — the princess who is forever part of the thousand temples she demanded be built.`
  },
  {
    id: "fs006",
    title: "The Legend of Lake Toba",
    titleId: "Legenda Danau Toba",
    region: "North Sumatra",
    kingdom: "Batak",
    category: "origin-story",
    summary: "A poor fisherman marries a woman who was once a golden fish, but breaks his promise of secrecy, causing a flood that creates the largest volcanic lake in the world.",
    characters: ["Toba (The Farmer)", "Samosir (The Fish-Bride)", "Si Nangkok (Son)"],
    moral: "Promises made from the heart must be kept; betrayal of trust breaks not just bonds but worlds.",
    fullText: `In the mountains of North Sumatra, before the lake existed, there was only a wide, fertile valley where a farmer named Toba tended his rice fields alone.

One afternoon, he went fishing in the river. He cast his line and felt an enormous pull. He hauled up a beautiful golden fish, scales shimmering like sunlight on water. As he reached for it, the fish spoke.

"Please do not eat me," the fish said in a voice like silver bells. "Release me and I will give you what you most desire."

Toba released the fish. The next morning, when he woke, a young woman of extraordinary beauty stood in his doorway, smiling. She told him she was the fish he had freed, and that she had come to be his companion and wife. She asked only one thing: he must never, ever tell their child that his mother had once been a fish.

Toba agreed with all his heart. They were happy. Years passed. Their son, Si Nangkok, grew strong and stubborn — he had his mother's golden eyes and his father's temper.

One day, when Si Nangkok was a young boy, he was supposed to bring his father's lunch to the field. But he ate it himself on the way, arriving with an empty basket.

Toba was furious. In his anger, he forgot himself — he forgot everything.

"You are just like your mother!" he shouted. "A fish! Your mother was a fish!"

The words hung in the air. The sky darkened. The woman — Si Nangkok's mother — appeared at the edge of the field. Her eyes were full of something between sorrow and understanding. She looked at Toba for a long moment.

"You have broken your promise," she said quietly. "Now I must return."

She told Si Nangkok to run to the highest hill and never look back.

Then she walked to the river. As she entered the water, the sky split with lightning. Rain fell like the ocean upended. The valley filled with water — rising, rising — until the fields, the homes, the trees all disappeared beneath a vast, blue lake.

The lake that formed is called Toba. In its center sits an island called Samosir — the name of the woman who was fish and wife and mother, now part of the water forever.

The Batak people of North Sumatra say the lake holds the spirits of the earliest ancestors, and that when the water is still and you look down, you can see the sunken valley of the world before the flood.`
  },
  {
    id: "fs007",
    title: "Nyai Roro Kidul — Queen of the Southern Sea",
    titleId: "Nyai Roro Kidul",
    region: "Java",
    kingdom: "Mataram Islam",
    category: "myth",
    summary: "The legend of the mystical queen of the Indian Ocean who is said to be the spiritual bride of every Sultan of Yogyakarta and Surakarta, ruling the Southern Sea forever.",
    characters: ["Nyai Roro Kidul", "Sultan Senopati (First Husband)", "Dewi Nawang Wulan (Celestial Ancestor)"],
    moral: "Power in the unseen world runs parallel to power in the seen world — rulers must honor both.",
    fullText: `In the age before Java was divided into sultanates, there was a princess whose name has been forgotten by history but whose fate was remembered by the ocean.

She was a princess of ancient blood, said to be descended from heavenly apsara — celestial dancers from the realm above. But she was struck by a terrible illness, a skin affliction that made her beautiful face peel and blister. Her father, ashamed and cruel, banished her from the palace.

She wandered south through the forests of Java, weeping, until she stood at the edge of the great cliff above the Southern Sea — the Samudra Hindia, what the Dutch would later call the Indian Ocean. She looked at the vast blue-green water and felt a strange calling.

She leaped.

But she did not drown. She was transformed. Her skin became smooth as the sea's surface on a windless morning. Her eyes became the dark green of the deepest water. Her hair spread around her like the current. She became Nyai Roro Kidul — the Queen of the Southern Sea — immortal, powerful, commanding the waves and storms and the invisible creatures of the deep.

For centuries she ruled her domain in silence.

Then came Sultan Senopati, the first great king of Mataram Islam. He was meditating at the Southern Sea shore when Nyai Roro Kidul rose from the waves, drawn to his power and grief. They spoke for days and nights. She became his advisor, his protector, his queen of the spiritual realm.

She made a pact: she would protect the rulers of Mataram — and later the sultans of Yogyakarta and Surakarta — as long as they honored her. Each sultan, at his coronation and in annual ceremonies called Labuhan, would offer gifts to the sea — flowers, batik, incense, rice — thrown into the waves at the sacred beaches of Parangtritis and Parangkusumo.

To this day, the Labuhan ceremony is performed by the royal courts. Fishermen on the South Coast know not to wear green near the sea — it is her color, and she may take you to keep as company.

Tourists at Parangtritis are warned: do not swim too far from shore, especially at dusk. The Queen of the Southern Sea is always watching, and she is said to be lonely.`
  },
  {
    id: "fs008",
    title: "Keong Mas — The Golden Snail Princess",
    titleId: "Keong Mas",
    region: "East Java",
    kingdom: "Kediri",
    category: "fairy-tale",
    summary: "A princess cursed into a golden snail is found by an old woman and gradually restored to her true form, waiting for the prince she loves.",
    characters: ["Dewi Candra Kirana (Princess)", "Raden Inu (Prince)", "Mbok Rondo (Old Widow)"],
    moral: "True love perseveres through any enchantment, and patience is the most powerful magic of all.",
    fullText: `In the kingdom of Daha, there lived a princess named Dewi Candra Kirana. Her beauty was like the full moon's — gentle, luminous, and beloved by all who saw her. She was betrothed to Prince Raden Inu of the neighboring kingdom, and they were deeply in love.

But in the court of Daha, there was another princess — Dewi Ajeng — who coveted the prince's affection. She was clever and devious. With the help of a wicked sorceress, she cast a curse on Candra Kirana, transforming the princess into a golden snail and throwing her into the river.

The golden snail drifted downstream for days, glinting in the current. An old widow, Mbok Rondo, was fishing at the river's edge when she scooped up the beautiful snail and took it home, thinking it pretty.

Each day, Mbok Rondo went out to work, and each day she returned to find her house swept, her rice cooked, her garden tended. She set a quiet watch and discovered the truth: from the snail emerged a beautiful young woman each day, who worked and then returned to her shell before Mbok Rondo came home.

One day, Mbok Rondo came home early. She saw the girl in her human form and embraced her. "Who are you? Why do you hide?" she asked.

The princess told her everything. The old woman wept and became like a mother to Candra Kirana, treating her with tenderness.

Meanwhile, Prince Raden Inu had been searching everywhere for his beloved. Guided by a dream, he traveled to the edge of the kingdom, asking every villager he met. Word reached him of a beautiful young woman who appeared and disappeared near an old widow's house.

He went there. The moment he crossed the threshold and saw her face, the curse shattered — for Candra Kirana's curse could only be broken by the genuine love of the man she was betrothed to.

She was fully human again, golden and whole. The wicked Dewi Ajeng's scheme had failed. Prince Raden Inu brought Candra Kirana home with great ceremony, and their wedding was celebrated across three kingdoms for seven days and seven nights.

Mbok Rondo, the old widow who had given the princess shelter and kindness, was brought to the palace to live in comfort for the rest of her days — for without her care, the princess would never have survived the curse.`
  },
  {
    id: "fs009",
    title: "Cindelaras — The Boy with the Rooster",
    titleId: "Cindelaras",
    region: "East Java",
    kingdom: "Kediri",
    category: "legend",
    summary: "A boy born in the forest to a banished queen grows up with a magical rooster that reveals his true royal identity when the king challenges him to a cockfight.",
    characters: ["Cindelaras", "Queen Candra Kirana (Mother)", "King Raden Putra (Father)", "The Evil Concubine"],
    moral: "Truth cannot be suppressed forever — a son's rightful place will always be revealed.",
    fullText: `There was once a king named Raden Putra who ruled a prosperous kingdom. He had two wives — his beloved queen and a cunning concubine who whispered poison into his ears at every opportunity.

The concubine wanted to be queen. She secretly made the queen ill with bitter herbs in her food, then told the king that his wife had practiced dark magic and tried to harm her. The king, blinded by the concubine's beauty and lies, banished the queen to the forest without listening to her pleas.

The queen was with child. Alone in the forest, she gave birth to a son she named Cindelaras. She wept as she held him — not for herself, but because her child would never know his kingdom, his father, his palace.

But the forest provided. A great eagle watched over them. And one day, the eagle dropped an egg at the boy's feet. When it hatched, out came a rooster unlike any other — compact, fierce, and blazing with the fire of the spirit that had sent it.

Cindelaras raised the rooster. As he grew, so did the rooster — and so did the rumors. The rooster crowed each morning with a strange song: "My master is Cindelaras, his mother is in the forest, his father is King Raden Putra!"

Word spread to nearby villages. Travelers brought the news to the capital. King Raden Putra heard the story and, intrigued, issued a challenge: bring this miraculous rooster to compete in the royal cockfight arena. If the rooster won, the boy could keep half the kingdom. If it lost, the boy's head would be forfeit.

Cindelaras was not afraid. He came to the palace with his rooster and faced the king's champion bird. The fight was fierce — but brief. Cindelaras's rooster was untouchable, driven by a righteous fire. It won completely.

The king looked at the boy — and saw in his eyes the shape of his banished queen's gaze. His chest tightened. "Who is your mother?" he asked.

Cindelaras told him everything.

The king summoned his advisors, interrogated servants, and the truth unraveled like a rotten thread — the concubine's poisonings, her lies, everything. He banished the concubine from the kingdom and sent his fastest horses to bring the queen and their son home.

Cindelaras grew up to become a wise and beloved prince, and when the time came, a just king.`
  },
  {
    id: "fs010",
    title: "Putri Mandalika — Princess Who Became Nyale Worms",
    titleId: "Putri Mandalika",
    region: "Lombok",
    kingdom: "Sasak",
    category: "legend",
    summary: "A Sasak princess of extraordinary beauty, unable to choose among her many suitors without causing war, sacrifices herself into the sea and becomes the nyale sea worms harvested by her people every year.",
    characters: ["Putri Mandalika", "Many Princes and Kings (Suitors)"],
    moral: "True sacrifice for one's people is the highest form of love.",
    fullText: `On the island of Lombok, in the coastal kingdom of the Sasak people, there lived a princess named Mandalika. She was so beautiful that the sunrise seemed to pause before her face, and the sea calmed when she walked to the shore.

Word of her beauty spread to every kingdom and principality in Nusantara. Princes came from Sumbawa, Bali, Bima, Java, Sumbawa, and islands whose names are now forgotten. Every prince who saw her fell in love instantly and demanded her hand in marriage.

Mandalika's father, the king, was trapped. He could not choose — any choice would mean war with all the kingdoms whose princes had been rejected. His daughter saw the impossible position she had placed them in, through no fault of her own.

She asked her father to summon all the suitors to Seger Beach on the twenty-fifth day of the month of Bau Nyale, when the tide was highest. She would give her answer there, in front of everyone.

The day came. Kings and princes, warriors and noblemen gathered on the sand in their finest armor and silk. The sea sparkled. The crowd waited.

Mandalika walked to the water's edge. She turned and looked at the gathered princes with a gentle, sorrowful smile.

"I cannot choose one of you," she said clearly. "To choose one would destroy the rest, and I would be the cause of war and grief for my people. So I choose none of you — and I choose all of you."

Before anyone could move, she walked into the sea. The water rose up and received her like an embrace. She did not drown. She dissolved — her form breaking apart into thousands upon thousands of small, colorful sea worms that swirled in the waves.

The crowd stood in stunned silence. Then they understood. The princess had given herself so that all people could have a share of her — equally, without favor.

Every year since, on the twenty-fifth night of the Sasak lunar month, the sea at Lombok's southern coast fills with nyale worms — tiny, brilliant creatures in green, red, blue, and purple. The Sasak people wade into the water to gather them, singing old songs. The nyale worms are eaten as a blessing, or used to predict the coming harvest.

The Bau Nyale festival — "Catching the Sea Worms" — is celebrated to this day. Mandalika is remembered as a princess whose love for her people was greater than any love for herself.`
  },
  {
    id: "fs011",
    title: "Si Pitung — Robin Hood of Batavia",
    titleId: "Si Pitung",
    region: "Betawi (Jakarta)",
    kingdom: "Nusantara",
    category: "legend",
    summary: "A Betawi folk hero who used martial arts and Islamic prayer to rob Dutch colonizers and distribute wealth among the poor of Batavia in the 19th century.",
    characters: ["Si Pitung", "Haji Naipin (Teacher)", "Schout Heyne (Dutch Constable)"],
    moral: "Courage used in service of the powerless is never truly defeated.",
    fullText: `In the crowded kampungs of old Batavia — the city the Dutch had built on the bones of the Jayakarta — there lived a young man named Pitung. He was a Betawi boy, the son of a fisherman, with quick eyes and a quicker mind.

From his Islamic teacher, Haji Naipin, Pitung learned pencak silat — the traditional Betawi martial art — and the power of prayer. He memorized passages from the Quran and practiced until his body moved like water, fast and yielding and impossible to hold.

Batavia in the 1880s was a city of cruel contrasts. Dutch landowners collected heavy taxes from indigenous Javanese and Betawi farmers and fishermen who could barely feed their families. The wealth flowed in one direction only — toward the colonial treasury.

Pitung could not watch it. He organized a group of young men from the kampungs. At night, they raided the estates of wealthy Dutch landowners and Indo-European businessmen who had grown fat on the labor of others. They took money, goods, livestock — and distributed everything back to the poor villages.

The people loved him. They hid him in their homes, fed him, warned him of police patrols. He became a legend while still alive — slipping past Dutch soldiers, disappearing into the rice fields, appearing again in a different kampung, laughing.

The Dutch constable Schout Heyne was assigned to capture Pitung. He tried repeatedly. Pitung escaped again and again — through back alleys, through the river, through the loyalty of ordinary people.

The Dutch eventually found informants. One told them that Pitung's amulet — a talisman given by his teacher — was the source of his invulnerability. The constable reportedly used a bullet soaked in pig's blood, which the informant claimed could pierce the protection.

Pitung was cornered in a village in 1893. He was killed. He was barely thirty years old.

But his story did not die with him. The people of Betawi sang his name in songs called lenong and gambang kromong. His memory became the memory of resistance — proof that ordinary people could stand up against an empire, even for a little while.

Today, Si Pitung's old house stands in Marunda, North Jakarta. It is a museum. The neighborhood still remembers.`
  },
  {
    id: "fs012",
    title: "The White Crocodile of Borneo",
    titleId: "Buaya Putih Kalimantan",
    region: "Kalimantan",
    kingdom: "Kutai",
    category: "myth",
    summary: "A Dayak fisherman encounters a great white crocodile that is actually a spirit guardian of the river, who makes a pact with the man to protect the river's balance.",
    characters: ["Rambang (The Fisherman)", "Antang (The White Crocodile)"],
    moral: "Nature is not an obstacle to overcome but a spirit to respect and coexist with.",
    fullText: `Along the great brown rivers of Kalimantan, where the trees grow so tall they seem to hold the sky, there was a Dayak fisherman named Rambang who had fished the same stretch of the Kapuas River for thirty years without ever going hungry.

He knew every bend, every shallow, every current. He could read the river the way a scholar reads a page. And he had learned one unspoken rule: do not enter the deep black pool at the river's bend after sunset.

Everyone in his longhouse knew about the pool. Offerings were left there — tobacco, rice wine, woven cloth — and whatever the river spirits were, they were respected.

But one day, Rambang's canoe was swept off course by a flash flood. He paddled hard but the current took him directly into the black pool as the sun set.

He stopped paddling. The water was utterly still. Even the insects were silent.

Then, from the depths, something rose. First the eyes — pale yellow, ancient — then the enormous white back, wider than his canoe. The white crocodile surfaced fully and looked at him without moving, without blinking.

Rambang did not reach for his paddle. He sat still and put his hands in his lap. "I have not come to harm you," he said quietly. "I was taken by the water. I mean no disrespect."

The white crocodile opened its mouth. And it spoke — not in sound exactly, but in a way Rambang understood as speech, the way you understand a dream's meaning even though nothing is said aloud.

The spirit told him: I am the guardian of this river's balance. I have watched your people fish here for five generations. You have been careful. You have taken what you need and left the rest. But others are coming — from the south, from the sea — who do not know these rules. Who will take everything.

Rambang asked: What can I do?

Carry this, the spirit said. A scale lifted from the crocodile's back and floated to Rambang's feet — white, hard, glowing faintly. Carry this, and when you speak about the river, speak about it as you would speak about your family. That is enough.

Rambang paddled home in the darkness without being harmed. He told his longhouse what he had seen. From that day, he became the voice of the river in every dispute about logging and fishing. He carried the white scale in a pouch at his belt.

He lived to be a very old man. They said the Kapuas river bent slightly toward his village, as if the river remembered him.`
  },
  {
    id: "fs013",
    title: "The Bird of Paradise — Origin Story",
    titleId: "Asal Mula Burung Cendrawasih",
    region: "Papua",
    kingdom: "Papua",
    category: "origin-story",
    summary: "The story of how the birds of paradise received their magnificent feathers as a gift from the gods, forbidden to land until the day they die.",
    characters: ["The First Cendrawasih", "The Creator Spirit", "The Forest Elders"],
    moral: "Beauty is a gift, not a possession — it belongs to the world, not just to us.",
    fullText: `The Asmat people of Papua tell this story about the beginning of the cendrawasih, the Bird of Paradise, which they consider to be a bird from another world.

In the time before time was counted, when the world was new and the forests of Papua were so thick and green that sunlight reached the ground only as scattered coins of gold, the Creator Spirit was finishing the work of making the island.

He had made the great trees, the river eels, the cassowary, the pigs, the fish, and the crocodile. He had made the men and women from carved wood and breathed life into them. Everything was well.

But there was one last gift left — a gift he had been saving, not knowing what to do with it.

It was pure, condensed beauty — the essence of color, of flight, of grace. Too concentrated to be given to any one creature, too precious to keep.

The Creator Spirit looked at the birds gathered at the edge of the forest and chose the smallest, most ordinary ones — brown, unimpressive birds that no one had noticed much.

He gathered them together and breathed the gift into their feathers.

The birds erupted with color. Long golden plumes grew from their sides, waving like flames. Their heads turned jewel-green and glossy black. Their tails grew into elaborate wires and spirals. They began to dance — rising, falling, spinning — moved by something beyond instinct.

The Creator Spirit spoke to them: "Because you now carry so much beauty, you must never rest on the ground. The earth is not for you. You will live in the high branches, and you will die in the sky, falling. Only in death will you touch the earth."

And so the cendrawasih — the Bird of Paradise — never builds a nest on the ground. It lives in the forest canopy of New Guinea and dances elaborate courtship rituals in the high branches, displaying colors that seem impossible for a living thing to hold.

The Papuan people believe that when a Bird of Paradise falls dead from the sky, it is a sign from the spirit world. They use its feathers — carefully, with ceremony and permission — in their headdresses and sacred dances.

To kill one carelessly, or to take its feathers without prayer, is to invite the Creator Spirit's displeasure.`
  },
  {
    id: "fs014",
    title: "Lutung Kasarung — The Wandering Monkey Prince",
    titleId: "Lutung Kasarung",
    region: "West Java",
    kingdom: "Sunda",
    category: "legend",
    summary: "A celestial being punished with monkey form falls to earth and, through his cleverness and supernatural gifts, helps a kind princess regain her kingdom from a jealous sister.",
    characters: ["Sanghyang Guru Minda (Lutung)", "Purbasari (Princess)", "Purbararang (Evil Sister)"],
    moral: "True virtue is recognized even beneath the most unlikely disguise.",
    fullText: `In the celestial realm above Mount Gede, there lived a son of the supreme deity named Sanghyang Guru Minda. He was beautiful and wise, but also arrogant — he believed his divine nature placed him above humility.

His father sent him down to earth in punishment: he would live as a lutung — a black leaf monkey — and would not regain his form until he had truly learned what it meant to be of service to others.

He fell to earth in the forest of the Sunda kingdom, bewildered and furious. He was an ugly monkey, fur matted, eyes too intelligent for a beast. He ran through the trees until he heard weeping.

The weeping came from a princess named Purbasari. She had been the beloved daughter of the king, the rightful heir to the Sunda throne. But her older sister, Purbararang, had coveted the throne for herself. With her husband's help, she had spread lies — saying Purbasari was cursed, that her skin was diseased — and had her banished to the forest.

Lutung crept close and listened. Then he approached carefully, signing that he meant no harm. Purbasari, alone in the forest and desperate, accepted the monkey's company.

Over the weeks that followed, Lutung proved remarkable. When Purbasari was hungry, he found the best fruits. When she was cold, he gathered the softest leaves. When storms came, he guided her to safe shelter. He seemed to understand her perfectly.

Then, in one extraordinary night, Lutung prayed to the celestial realm. By morning, a beautiful terraced garden had appeared around Purbasari's shelter — rice fields, fruit trees, a spring of clear water. He had called down gifts from above.

Word reached the palace of this miracle. The king sent messengers to investigate. Purbararang came herself, furious.

She challenged Purbasari: a contest of servants. Whoever had the most beautiful and skilled companion would be queen.

Purbararang presented her fine husband, polished and capable.

Purbasari had only her monkey.

But as Lutung stepped forward into the clearing, the curse broke. His monkey form dissolved. In his place stood a tall, luminous young man of such extraordinary bearing that everyone in the clearing fell silent.

He was recognized as a heavenly being. The king and his court knelt. Purbararang's lies unraveled in the light of this impossible grace, and she confessed everything.

Purbasari was restored to her rightful place. Lutung Kasarung remained on earth as her husband, having learned what service truly meant.`
  },
  {
    id: "fs015",
    title: "Asal Usul Selat Bali — The Origin of the Bali Strait",
    titleId: "Asal Usul Selat Bali",
    region: "Bali / East Java",
    kingdom: "Majapahit",
    category: "origin-story",
    summary: "The story of Sidi Mantra, a holy man whose powerful son Manik Angkeran cuts off his father's sacred serpent's tail, causing his father to separate Bali from Java with a staff drawn across the earth.",
    characters: ["Sidi Mantra (Holy Man)", "Manik Angkeran (Son)", "Naga Besukih (Sacred Serpent)"],
    moral: "Even the deepest love must set limits — a son's wrongdoing cannot be excused forever.",
    fullText: `On the eastern tip of Java, near what is now called Banyuwangi, there lived a holy man named Sidi Mantra. He was a man of great spiritual power — a Brahmin priest respected by both the visible world and the invisible.

His son, Manik Angkeran, was everything his father was not. He was handsome and charming, but restless and reckless. He gambled. He borrowed. He drank. He left debts everywhere he went. And each time he ran out of money, he returned to his father, who always — always — helped.

Sidi Mantra's wealth eventually ran out. Desperate to help his son one last time, he went to Mount Agung in Bali, where a great sacred serpent named Naga Besukih lived in the mountain's crater. This serpent was immensely old, a guardian spirit who could produce gold and jewels from its scales when the right prayers were offered.

Sidi Mantra prayed for three days. The naga appeared, magnificent and terrifying. It was pleased with the holy man's sincerity and shook gold coins from its scales. Sidi Mantra thanked the spirit humbly and returned to his son.

Manik Angkeran gambled the gold away in days.

He came back to his father and demanded more. This time, Sidi Mantra told him the source — and told him never to go there himself.

But Manik Angkeran went. He had memorized the prayers by listening to his father. He went to the mountain, offered the prayers, and the great naga appeared and shook more gold. Manik Angkeran's eyes fell on the naga's golden tail — the most concentrated source of its treasure.

In a moment of terrible greed, he drew his keris and cut the tail off.

The serpent reared up in agony and fury. Manik Angkeran ran, but the naga's fire consumed him instantly.

Sidi Mantra learned what had happened. He wept — for his son, for his own weakness in always forgiving too easily. He returned to the mountain and apologized to Naga Besukih. He asked for his son's life to be restored, and the serpent, moved by the father's genuine grief and wisdom, restored Manik Angkeran.

But Sidi Mantra knew it had to end. He took his walking staff and drew a long, deep line in the earth from the northern sea to the southern sea, across the narrow isthmus where Bali met Java.

The sea rushed in on both sides.

Where the line was drawn, the waters met. The strait — Selat Bali — opened between Java and Bali. His son stood on the Bali side. His father stood on the Java side.

They looked at each other across the new water.

"Stay in Bali," the father said. "Atone for what you have done. I love you, but you cannot follow me anymore."

They never crossed the strait again.

The Bali Strait is only about 2.5 kilometers wide at its narrowest point — the smallest gap between two great islands. But the story says it was made by a father's impossible grief and his final act of love.`
  },
  {
    id: "fs016",
    title: "Ken Arok — The Man Who Became a King",
    titleId: "Ken Arok",
    region: "East Java",
    kingdom: "Singhasari",
    category: "legend",
    summary: "The story of a mysterious orphan who rises from thief to kingmaker to king, ruling with a cursed blade that fulfills its terrible prophecy.",
    characters: ["Ken Arok", "Ken Dedes (Queen)", "Empu Gandring (Blacksmith)", "Tunggul Ametung (Lord)"],
    moral: "Power taken through violence is never truly secure — the blade you forge may one day return to you.",
    fullText: `The Pararaton — the Book of Kings — tells this story, and the people of East Java still argue about what is legend and what is history.

Ken Arok was born, they say, to a woman who could not keep him. He was abandoned in a cemetery and raised — briefly — by thieves. He had a face that made people trust him and a spirit that made them love him, but also a restlessness that would never be satisfied.

He grew up quick and clever, working for various lords, always rising. He came to serve Tunggul Ametung, the lord of Tumapel, a vassal territory of the kingdom of Kediri. There he saw Ken Dedes — Tunggul Ametung's wife.

Ken Dedes was extraordinary, and she was more than beautiful: she was said to be a woman of divine destiny, a symbol of authority that whoever possessed her would rule a great kingdom. Ken Arok decided he would have that kingdom.

He commissioned a legendary blacksmith, Empu Gandring, to forge a supernatural keris. It took Empu Gandring years. The blade was not finished when Ken Arok came to collect it, impatient. They argued. Ken Arok snatched the unfinished blade and drove it into Empu Gandring.

As Gandring died, he cursed the blade: it would kill seven men, including Ken Arok himself and his descendants.

Ken Arok used the blade to kill Tunggul Ametung and blamed the murder on another. He married Ken Dedes and took control of Tumapel. Then he moved against the kingdom of Kediri itself, defeated it, and founded the kingdom of Singhasari in 1222 CE — the first great East Javanese empire.

He was king. He had everything he'd wanted.

But the blade's curse was patient.

His stepson Anusapati, the son of Ken Dedes and Tunggul Ametung, eventually learned the truth of his father's murder. He obtained the cursed keris and used it to kill Ken Arok.

The blade passed from hand to hand. Lords killed lords. The curse counted its victims one by one.

Singhasari went on to grow into one of the great kingdoms of Java, culminating in King Kertanegara — a visionary who dreamed of a Nusantara united from Sumatra to Maluku. But Singhasari, too, eventually fell — to a rebellion backed by the Mongol Yuan dynasty, which led to the founding of the next great kingdom: Majapahit.

The keris of Empu Gandring is said to still exist, never fully at rest.`
  },
  {
    id: "fs017",
    title: "Situ Bagendit — The Greedy Woman's Lake",
    titleId: "Situ Bagendit",
    region: "West Java",
    kingdom: "Sunda",
    category: "origin-story",
    summary: "A rich, miserly widow refuses to help a poor old man, and when he stamps his walking stick on the ground, a spring bursts forth and floods her entire estate into a lake.",
    characters: ["Nyi Endit (The Rich Widow)", "The Old Beggar (Spirit)"],
    moral: "Wealth hoarded away from those in need is a crime against the spirit of the world.",
    fullText: `In the highlands of West Java, near what is now called Garut, there was a prosperous village in a wide, sunny valley. The richest person in the valley was a widow named Nyi Endit.

Nyi Endit had inherited vast rice fields, granaries overflowing with harvested rice, herds of buffalo, and a grand house with carved wooden pillars. She had more than she or fifty families could ever need.

But she never gave anything away.

When the harvest was bad and neighbors came to borrow rice — no. When a widow came asking for a handful of grain for her children — no. When the rains failed and the well ran dry — her gate was shut. She sat behind her walls with her wealth and watched the village suffer.

One dry season, a very old man appeared in the village. He was thin as a reed, his clothes worn to threads, his walking stick carved with strange symbols. He went door to door asking for water — just water.

Every door in the village opened. The poor gave what they had, though it was little.

He came at last to Nyi Endit's great gate. She looked at him from her porch with narrowed eyes.

"I have nothing for beggars," she said. "Go away."

The old man stood at the gate for a long moment. Then he nodded slowly, as if he had been expecting exactly this answer.

He raised his carved walking stick and brought it down hard on the ground, once.

A sound like thunder from directly below. Then a crack appeared in the earth at the base of the stick, and from it burst a spring — cold, powerful water shooting upward. Within seconds it had become a stream. Within minutes, a river.

Nyi Endit screamed. Her servants ran. The water rose over the threshold of the gate, across her courtyard, into her granaries. The rice floated away. The buffalo swam in circles then disappeared. The carved pillars of her house softened and fell.

Within an hour, her entire estate was under water.

The old man was gone. The village people watched from the hills as the valley filled into a wide, still lake.

Situ Bagendit — the Lake of Bagendit — still exists in Garut Regency, West Java. It is a popular recreation spot, beautiful and serene. Fish are plentiful there.

The village people say the fish are the descendants of Nyi Endit's buffalo and chickens, transformed by the water. They say the lake is always full, even in the dry season, because the spring at its heart never stops. The old man is still there, somewhere below.`
  },
  {
    id: "fs018",
    title: "Gajah Mada's Oath — Sumpah Palapa",
    titleId: "Sumpah Palapa Gajah Mada",
    region: "East Java",
    kingdom: "Majapahit",
    category: "legend",
    summary: "The story of Gajah Mada, the greatest prime minister of the Majapahit Empire, who swore he would eat no spices until he had united all of Nusantara under one rule.",
    characters: ["Gajah Mada", "Queen Tribhuwana Tunggadewi", "Hayam Wuruk (Young King)"],
    moral: "A great purpose demands great sacrifice — and greatness is achieved not through conquest alone but through unwavering commitment.",
    fullText: `In the year 1336 CE, in the court of Majapahit, there was a moment that would define the trajectory of Indonesian history.

Queen Tribhuwana Tunggadewi sat on the golden throne of Majapahit. She was a formidable ruler — wise, decisive, respected by her generals and feared by her enemies. But the empire needed a prime minister of equal quality. She appointed Gajah Mada.

Gajah Mada was not a prince. He was a soldier who had risen through merit, then intelligence, then demonstrated loyalty — he had personally commanded the guard that rescued a young prince from a rebellion. He was short, powerfully built, with eyes like a hawk's and a voice that could silence a war council.

At his appointment ceremony, Gajah Mada made a declaration that stunned everyone in the court.

He swore the Sumpah Palapa — the Palapa Oath.

"I will taste no spices," he declared. "No gulai, no peppered meat, no seasoned rice — until I have defeated every enemy of Nusantara. Gurun, Seram, Tanjungpura, Haru, Pahang, Dompo, Bali, Sunda, Palembang, Tumasik — all of these must submit to Majapahit's rule. Only then will I eat."

Palapa meant spices — the very substance of trade and wealth and pleasure that made the islands famous. For a Javanese nobleman to forswear spices was to forswear comfort itself.

The court was shocked. Some laughed. A minister named Gajah Nila mocked him openly: "This is arrogant nonsense from someone barely worthy of his position."

Gajah Mada said nothing. He went to work.

For the next twenty-one years, he campaigned, negotiated, pressured, and out-maneuvered every rival in the archipelago. He used military force when needed, but he was also a diplomat of the highest order — sending envoys, arranging marriages, threatening, and offering. One by one, the kingdoms of Nusantara acknowledged Majapahit's authority.

Under the young King Hayam Wuruk, who came to the throne in 1350, the Majapahit Empire reached its greatest extent. The Nagarakretagama, the great court poem by Mpu Prapanca, lists the vast territories under Majapahit's influence — stretching from the northern tip of Sumatra to the Maluku islands, touching what is now Malaysia, Brunei, and parts of the Philippines.

Gajah Mada had kept his oath.

He died in 1364, before the empire began its long, slow decline. His name is remembered in Indonesia today with a reverence usually reserved for prophets: on the currency, on universities, on military academies. He represents the idea — the impossible, burning idea — that the scattered islands of the archipelago could be one.

The Sumpah Palapa is still quoted by Indonesian leaders. It is the dream that became a country.`
  },
  {
    id: "fs019",
    title: "Dewi Sri — Goddess of Rice",
    titleId: "Dewi Sri",
    region: "Java and Bali",
    kingdom: "Mataram Kuno",
    category: "myth",
    summary: "The origin story of how rice came to the world — through the death and rebirth of a divine princess whose body became the sacred plant that feeds all people.",
    characters: ["Dewi Sri", "Sedana (Brother/Spirit)", "The Gods"],
    moral: "The most essential gifts come from sacrifice, and every grain of rice carries the memory of the divine.",
    fullText: `Before rice existed, the world was hungry. The gods ate heavenly foods, but the human beings below had only roots and wild fruit — never enough, never sweet, never satisfying.

In the heavenly realm, there lived a beautiful princess named Sri. She was the daughter of divine parents, radiantly lovely, gentle in everything she did. Her brother was Sedana, equally gentle, who loved her with a pure, brotherly devotion.

The king of the gods — some stories say it was Batara Guru — saw Sri's beauty and wanted her for his wife. But Sri did not love him. She was afraid. She refused.

In some versions, she died fleeing the king's pursuit. In others, the gods decided that her life, transformed, would serve the greater good of all humans. In all versions, the result is the same: Sri died.

Her body was buried in the earth of the human world.

From where her body lay, something grew — plants unlike anything seen before. Green, feathery, tall, with heavy golden heads that hung like pendants. The humans discovered that the seeds of these plants, cooked and eaten, were the most nourishing, most satisfying food imaginable. They called the plant padi — what we now call rice.

From Sri's eyes grew the finest rice — long-grained and fragrant. From her hands grew medium rice. From her feet grew coarser varieties. From her tears grew the sweet water that rice needs to grow.

Her brother Sedana, who had also died of grief, became the spirit of prosperity and wealth — the energy that accompanies abundance when rice is plentiful.

The Balinese, to this day, have some of the most elaborate rice agriculture rituals in the world. Before planting, a small ceremony is held in the field. Before harvesting, the first stalks are cut with care, as if tending to a deity. The rice is stored in a special rice barn — the jineng — built on high poles to keep it above the earth, because it is sacred.

In Java, during the harvest season, the "rice mother" — the first bundled stalks of a new harvest — is carried to the house wrapped in batik cloth and decorated with flowers, then spoken to gently, as if welcoming a guest.

Sri is everywhere rice is grown. She is the reason that a bowl of rice in Indonesia is never eaten carelessly — it is always accompanied by gratitude.`
  },
  {
    id: "fs020",
    title: "Asal Usul Reog Ponorogo — The Origin of the Lion Dance",
    titleId: "Asal Usul Reog Ponorogo",
    region: "East Java",
    kingdom: "Majapahit",
    category: "legend",
    summary: "The story of how the Reog dance was created by a Ponorogo prince and his jester as a form of disguised political satire against the corrupt court of Majapahit.",
    characters: ["Ki Ageng Kutu (Prince)", "Singo Barong", "The Peacock (Dadak Merak)"],
    moral: "Art and performance can carry the truths that plain speech cannot safely speak.",
    fullText: `In the waning years of the Majapahit Empire, there was a district called Ponorogo in East Java. The district's leader was Ki Ageng Kutu — a wise and righteous man who served the Majapahit court but grew increasingly troubled by what he saw there.

The king of Majapahit at the time was weak, they say, dominated by his powerful queen and her family. The royal court had become corrupt. Laws bent for the rich. The people struggled while the court feasted.

Ki Ageng Kutu was not the kind of man who simply accepted injustice. But open rebellion was not yet possible — Majapahit still commanded enough military force to crush him. He needed another approach.

He gathered his most creative followers — dancers, musicians, mask-makers, puppeteers — and told them what he intended. They spent months working.

What they created was Reog.

The centerpiece was a massive mask — a tiger's head (the Singo Barong) with a giant peacock headdress mounted on top, up to 2.5 meters tall and weighing up to 50 kilograms. It represented the king of Majapahit — the peacock feathers representing the queen's influence that sat atop and controlled even the fearsome lion.

The dance was performed at public gatherings. The lion danced and then was ridden by young men — warok warriors whose strength was supernatural, who used mystical martial arts — representing the people of Ponorogo controlling their destiny. The jester figure, Bujang Ganong, mocked the court with every gesture.

Everyone understood the allegory. But the performers always claimed it was just entertainment.

Ki Ageng Kutu eventually left Majapahit's service and established a spiritual community in the mountains. His followers — warok — became legendary practitioners of Javanese martial mysticism.

The Reog Ponorogo dance survived everything: the fall of Majapahit, the coming of Islam, Dutch colonization, the modern era. It is now UNESCO-recognized as part of Indonesia's intangible cultural heritage.

Every year, the Grebeg Suro festival in Ponorogo brings out thousands of performers in the full Reog regalia, dancing the story of a man who turned his frustration into art, and kept a community's identity alive through performance when words would have been dangerous.`
  },
  {
    id: "fs021",
    title: "The Legend of Ratu Boko",
    titleId: "Legenda Ratu Boko",
    region: "Central Java",
    kingdom: "Mataram Kuno",
    category: "legend",
    summary: "The story of King Boko, a powerful but cruel ruler whose daughter Roro Jonggrang becomes the stone statue of Prambanan, and his palace complex becomes ruins on the hill.",
    characters: ["Prabu Boko (King)", "Roro Jonggrang (Daughter)", "Bandung Bondowoso"],
    moral: "Power without wisdom leaves only ruins.",
    fullText: `Above the Prambanan plain, on a ridge with a view of two smoking volcanoes, stand the stone gates and foundations of what was once a palace. The Javanese call it Kraton Ratu Boko — the Palace of King Boko.

The stories say that Ratu Boko — sometimes called Prabu Boko — was a giant, or a giant-like king of supernatural power. He ruled a kingdom near Prambanan and was feared for his strength and the severity of his law.

His daughter, Roro Jonggrang, was famous throughout Java for her beauty and intelligence. She was the pride of her father's court — gracious, accomplished, sharp-minded. But she was also deeply unhappy in her father's kingdom, for she had seen how Prabu Boko used his power.

Then came the war.

The kingdom of Pengging, led by Prince Bandung Bondowoso and his father, attacked. They said Prabu Boko had been raiding their border villages, taking tribute by force. The war was fierce. In the end, Prabu Boko was killed by Bandung Bondowoso himself in single combat.

Bandung Bondowoso's forces entered the palace on the hill. And there he saw Roro Jonggrang.

He fell in love immediately and asked to marry her. She hated him — he had killed her father. But she was now without protection. She set the condition of a thousand temples in one night.

(The rest of the story continues in the legend of Roro Jonggrang and Prambanan.)

The palace of Prabu Boko on the hill was never rebuilt after the war. Its stone foundations remained, empty and wind-swept, above the plain where the thousand temples now stand.

Archaeologists have since excavated the site and found that it was indeed a real hilltop compound — likely a retreat or ceremonial complex dating to the 9th century CE. The gates of Ratu Boko are among the most dramatic ancient structures in Java: massive stone frames standing against a sky that turns gold and crimson at sunset.

Tourists come to watch the sunset from Ratu Boko and look down at the spires of Prambanan below — the father's palace and the daughter's temple, separated only by the valley between them.`
  },
  {
    id: "fs022",
    title: "Barong and Rangda — The Eternal Battle",
    titleId: "Barong dan Rangda",
    region: "Bali",
    kingdom: "Bali",
    category: "myth",
    summary: "The cosmic battle between Barong, the protective spirit-lion of Bali, and Rangda, the demon queen of witches — a battle that never ends, representing the eternal balance of good and evil.",
    characters: ["Barong (Spirit Lion)", "Rangda (Demon Witch Queen)", "Dewi Kunti", "The Soldiers of Erlangga"],
    moral: "Good and evil are not opposites to be eliminated — they are forces to be balanced, forever.",
    fullText: `There is no story in Bali that ends with evil truly defeated. This is the most important thing to understand about the Barong and Rangda.

Barong is the king of the spirits, the protector of Bali. He looks like a lion — or sometimes a boar, a dragon, a tiger — his enormous mask covered in long white hair, his body held by two men who dance as one, his crown golden and elaborate. When Barong walks through a village in ceremony, the air itself becomes safer.

Rangda is his counterpart and eternal opponent. She is the queen of black magic, the mother of all leyak — shapeshifting evil spirits. She has white hair that stands on end, pendulous breasts, long fingernails like claws, a terrifying mask of teeth and tongue. She holds fire. She walks on death.

The greatest expression of their relationship is the Calonarang dance-drama, performed to cleanse a village of illness or disaster.

The story goes like this: once, a widowed woman named Calonarang was scorned by the village because her daughter was unmarried — no man would court the daughter of a witch. In her grief and rage, Calonarang turned fully to black magic. She became Rangda, the demon queen, and sent disease and death into the village.

The king of the time — in the Balinese telling, it is King Erlangga of East Java — sent his soldiers to fight her. They failed. Her magic was stronger.

He sent a holy man. The holy man discovered the source of Rangda's power: a sacred text she guarded. Through trickery and prayer, the text was taken. Rangda weakened.

Then Barong appeared.

The battle between Barong and Rangda is performed by dancers in trance. The soldiers of Erlangga try to stab Rangda with their kris daggers, but she makes them immune to their own blades — they turn the daggers on themselves, pressing them against their own chests, arms trembling, and do not bleed. Barong's blessing protects them.

The battle continues. And continues.

And it does not end.

Because in the Balinese worldview, it cannot end. Rangda cannot be destroyed any more than Barong can. They are two faces of the same reality — darkness and light, sickness and health, death and life — locked in a dance that keeps the world in balance.

At the end of every Calonarang performance, the high priest enters and sprinkles holy water on the entranced dancers, bringing them back to themselves. Barong retreats. Rangda retreats. Balance is restored — temporarily.

And the next ceremony will begin again, as it always has.`
  },
  {
    id: "fs023",
    title: "Semar — The Clown Who Is God",
    titleId: "Semar",
    region: "Java",
    kingdom: "Mataram Kuno",
    category: "myth",
    summary: "The paradoxical story of Semar — the ugly, pot-bellied clown of Javanese wayang who is actually one of the most powerful divine beings in existence, the caretaker of Java itself.",
    characters: ["Semar (Sang Hyang Ismaya)", "Gareng (Son)", "Petruk (Son)", "Bagong (Son)", "Arjuna (Ward)"],
    moral: "Wisdom and power are often found where we least expect them, wearing the most humble of disguises.",
    fullText: `Every Javanese wayang kulit performance includes a set of figures that are unlike the others. While the Pandawa heroes and Kurawa princes are tall, elegant, refined — one face in particular is round, squat, black, pot-bellied, with a flat nose and drooping eyes.

This is Semar. And Semar is not a servant. Semar is not a comic relief figure. Semar is, in the deepest Javanese understanding, a god.

The story goes: in the beginning, before the universe was organized, there were two divine brothers — Sang Hyang Tunggal had twin sons. One became Batara Guru, the great lord of the gods, luminous and powerful. The other was Sang Hyang Ismaya — who chose to descend to the human world and live in the humblest possible form.

Sang Hyang Ismaya became Semar: an old man, fat, ugly, with a single tooth, always accompanied by his three adopted sons (Gareng, Petruk, and Bagong — other demoted divine beings). He became the caretaker of Java, the guardian of its people.

In every wayang story, Semar accompanies the noble heroes — he is the retainer and clown of the Pandawa princes, particularly Arjuna. But his jokes carry wisdom. His laughter punctures pretension. When the nobles argue endlessly about honor, Semar makes a rude noise and solves the problem with common sense.

When genuine evil threatens — when the cosmic balance is truly at stake — Semar drops the comedy. He becomes something terrifying. His divine nature emerges. Batara Guru himself will yield to Semar's judgment when things go truly wrong, because Semar, the ugly, smelly, ridiculous old man, is in truth older and wiser than all the beautiful gods.

There is a teaching embedded in this: power wears strange costumes. The person who controls the room is not always the one with the finest clothing. Wisdom is older than dignity.

The Javanese love Semar more than almost any other figure in the wayang repertoire. He is their own — wholly Javanese, carrying none of the Hindu or Malay or foreign influences. He is the spirit of the island itself, looking out for the little people through every era of kings and colonizers and revolutions.

When a dalang — a shadow puppet master — performs, and Semar's black, round silhouette appears on the screen, the audience always smiles. They are glad he is there.`
  },
  {
    id: "fs024",
    title: "Si Kabayan — The Wise Fool of Sunda",
    titleId: "Si Kabayan",
    region: "West Java",
    kingdom: "Sunda",
    category: "fable",
    summary: "The beloved Sundanese trickster-fool whose laziness and peculiar logic always somehow result in the best outcome, baffling his family and neighbors.",
    characters: ["Si Kabayan", "Nyi Kabayan (Wife)", "Father-in-Law", "Neighbors"],
    moral: "Sometimes what looks like foolishness is just an uncommon kind of wisdom.",
    fullText: `Si Kabayan is the beloved fool of Sunda — the man who is always in trouble, never quite what his family wants him to be, but who, through some combination of laziness, luck, and peculiar wisdom, always stumbles into the right answer.

He is not one story. He is hundreds of small stories. Here are three.

**The Goat on the Roof**

Si Kabayan's father-in-law gave him a goat to tend. Si Kabayan was supposed to let the goat graze. But it was a hot day, and Si Kabayan wanted to sleep. He tied the goat to the roof thatch and lay down in the shade.

The goat ate through the rope and also ate half the thatch.

When Si Kabayan's father-in-law arrived, furious, Si Kabayan scratched his head. "I thought it was safer up there," he said. "You told me goats like to be where it's cool and elevated. The roof is cool and elevated."

The father-in-law had no good response to this.

**The Dead Fish**

Si Kabayan was sent to the market to sell fish. The fish were fresh when he left, but it was a long walk, and by the time he arrived, they were beginning to smell. Nobody bought them.

On the way home, he passed a river and washed the fish, thinking this might help. The fish dissolved somewhat. He arrived home with a bucket of fish water.

"Where are the fish?" his wife asked.

"I sold them," he said. "In liquid form. The buyer wanted soup, not whole fish. I adapted."

**The Impossible Prayer**

Si Kabayan was told to pray every day — properly, at the right times, with full sincerity. He agreed.

But his prayers were somewhat unusual. He would say: "God, I know you are great. I know you don't need my help. But just in case — I am available."

His wife was horrified. "That is not a proper prayer!"

"It is honest," Si Kabayan said. "All the other prayers I hear sound like people giving orders. I am offering assistance."

No one could decide if he was deeply stupid or secretly a philosopher.

The stories of Si Kabayan are told to Sundanese children with great affection. He represents something real in the Sundanese character — a preference for sincerity over performance, and the belief that cleverness is not always the same as intelligence.`
  },
  {
    id: "fs025",
    title: "The Crying Stone of Sumatra",
    titleId: "Batu Menangis Kalimantan",
    region: "West Kalimantan",
    kingdom: "Kutai",
    category: "legend",
    summary: "A proud and cruel daughter mocks her poor mother in front of her wealthy friends, and the heavens turn her to stone that weeps forever.",
    characters: ["The Proud Daughter", "The Poor Mother", "Village Elders"],
    moral: "Shame cast upon a loving parent is one of the worst sins — and the universe always notices.",
    fullText: `In a village on the coast of West Kalimantan, there was a young woman of great beauty who had married into a wealthy family and promptly forgot where she had come from.

Her mother was still poor — a small, tired woman who worked the fields alone, whose clothes were patched, whose house was old. But her love for her daughter was enormous and unchanging.

One day, the daughter was walking with her husband and his wealthy friends along the village road. Around the bend, she saw her mother coming toward them with a basket of vegetables on her head, her feet bare, her old kebaya faded and thin.

The daughter's face went cold.

Her husband asked pleasantly, "Who is that woman?"

The daughter said, without looking at her mother: "Oh, she's just a servant of my family's old house. Nobody important."

Her mother heard every word. She stopped in the road. Her eyes filled with tears. She put her basket down and stood very still.

The daughter walked past without meeting her eyes.

The mother looked up at the sky and wept. Not angry weeping — the deep, quiet weeping of a mother whose love has just been stepped on by the child she carried and fed and sang to.

She prayed. Or perhaps she simply wept so fully that the prayer formed itself without words.

A rumbling came up from the earth. The daughter felt her feet become heavy. She looked down and saw that her shoes had become stone. She screamed and tried to run, but the stone crept up her legs, her waist, her chest.

Her husband ran. Her friends ran. The mother stood still.

The stone reached the daughter's face. It stopped there, and what remained was a stone figure of a young woman, beautifully preserved, her face caught in an expression of terror and — some say — regret.

But this is the strangest part: the stone weeps.

Travelers who have seen it describe moisture seeping from the surface of the stone around the face, as if it is always crying. On rainy days it weeps more. On dry days, less, but never stopped completely.

The mother, they say, went home and lived simply and without bitterness. She lit incense for her daughter's spirit each morning. She had not stopped loving her — she never would.

Batu Menangis — the Crying Stone — is a real landmark in West Kalimantan. People leave offerings there and pray for wisdom in their family relationships.`
  },
  {
    id: "fs026",
    title: "The Origin of the Kris",
    titleId: "Asal Usul Keris",
    region: "Central Java",
    kingdom: "Majapahit",
    category: "legend",
    summary: "The mythological origin of the keris dagger — how a divine blacksmith was shown by the gods how to forge a blade with a living soul, which became the most sacred weapon in Javanese culture.",
    characters: ["Empu Ramadi (First Blacksmith)", "Batara Brahma (God of Fire)", "The Ancestor Kings"],
    moral: "A great creation carries the spirit of its maker — handle with reverence.",
    fullText: `Long before the kingdoms of Java rose and fell, there was a blacksmith named Empu Ramadi who was the most skilled craftsman of his time. He could shape iron into anything — tools, locks, ornaments — but he always felt that metal had more potential than he understood how to unlock.

He prayed for seven days at the edge of his forge, asking to be shown more.

On the seventh night, Batara Brahma — the god of fire — appeared in the flames of the furnace.

"You have asked for deeper knowledge," Batara Brahma said. "I will show you, but you must understand: what you are about to learn is not just craft. It is the creation of something with a soul."

He guided Empu Ramadi through a process unlike any metalwork before. The iron was folded again and again — hundreds of folds, over weeks — creating layers within layers. Nickel from a fallen star — what the Javanese call meteorite iron — was worked into the layers, creating rippling patterns in the metal that were visible like wood grain.

This pattern, Batara Brahma explained, was called pamor — the signature of the blade's spiritual identity. Different pamor patterns carried different energies: some brought wealth, some brought protection, some brought eloquence, some brought danger.

The blade was not straight. It was shaped with waves — the curves of a serpent — representing both the naga (divine serpent) and the flowing energy of life.

When the blade was complete, Empu Ramadi held it up. It felt warm, even without the fire. It seemed to vibrate slightly in his hand, as if it wanted to move.

Batara Brahma said: "This blade has been born. It has a name, and a nature, and a destiny. It is not fully yours and never will be. You are its maker, not its owner. Treat it as you would treat a sacred child."

The keris that Empu Ramadi made was the first. Every keris since has been made in the tradition he established: the folding, the pamor, the distinctive wavy blade (or sometimes straight, for certain purposes), and the handle shaped for a specific purpose.

In Javanese belief, a keris is alive. It must be cleaned once a year — treated with jasmine water and coconut oil. It must be stored pointing upward, never across the sleeping body of its keeper. It can be "lent" spiritual energy, and it can become hostile if mistreated or given to the wrong person.

The greatest keris are given names and have histories stretching back centuries. They are inherited, not just passed on. They are consulted, in a sense, before major decisions.

Today, making a keris is recognized by UNESCO as an Intangible Cultural Heritage of Humanity. The empu — the keris master — who knows the old methods is increasingly rare. But each keris they make still carries the principles Batara Brahma showed to Empu Ramadi: patience, intention, reverence, and the understanding that a blade with a soul demands a maker with one.`
  },
  {
    id: "fs027",
    title: "Jaka Tarub — The Man Who Married an Angel",
    titleId: "Jaka Tarub",
    region: "Central Java",
    kingdom: "Mataram Islam",
    category: "fairy-tale",
    summary: "A young man steals a flying shawl from a bathing celestial maiden and forces her to marry him. Their happiness is fragile, built on a secret that eventually surfaces.",
    characters: ["Jaka Tarub", "Nawang Wulan (Celestial Maiden)", "Nawangsih (Daughter)"],
    moral: "Love built on deception cannot last forever — and secrets always surface at great cost.",
    fullText: `Jaka Tarub was a young man who lived alone at the forest's edge, hunting and farming quietly. He had no family left. He was lonely in a way he had stopped noticing.

One afternoon he heard laughter from the lake deep in the forest — a lake he had never found before. He crept through the undergrowth and parted the leaves.

Seven young women were bathing in the water, radiant, their loose hair floating on the surface. On the bank lay seven beautiful garments — not cloth exactly, but things that shimmered and shifted like reflections on water.

They were celestial maidens, apsara from the heavenly realm, come down to earth for their weekly bath.

Jaka Tarub, without thinking clearly, crept forward and took one of the shimmering garments. He hid it under his shirt and retreated into the trees.

When the maidens were ready to leave, six of them found their garments and rose into the sky, dressing as they flew. The seventh — Nawang Wulan — searched and searched. She could not go back without her selendang — the garment that connected her to the heavenly realm.

She was stranded on earth.

Jaka Tarub "found" her weeping and brought her home. He was kind to her. He did not immediately reveal what he had done. They talked for days. They became friends. Eventually they married, and their life together was genuinely warm.

Nawang Wulan had a gift: she could cook a single grain of rice and it would fill the entire pot. As long as Jaka Tarub never looked inside the pot while she cooked, their granary would never empty.

For years this worked. Then one day, Jaka Tarub, distracted by a task, looked inside the pot.

The magic broke. From that day, Nawang Wulan had to cook rice the ordinary way — grain by grain, handful by handful — and the granary slowly depleted. One day she went to the bottom of the granary for the last of the rice and found, buried there, her shimmering selendang.

She understood everything.

She held the garment and felt it pulse with the memory of the sky. She looked at her husband. She looked at their daughter, Nawangsih, who was sleeping in her crib.

"I must go," she said. "I always had to go. But I am glad for the years."

She dressed in the selendang and rose toward the sky.

She did not abandon her daughter entirely. She promised to return each night, after the baby was asleep, to nurse her. And for a time, she did — descending silently in the dark, feeding the baby, then rising again before dawn.

Nawangsih grew up knowing the sky was her mother's home, that she herself was half between worlds. Jaka Tarub lived with the choices he had made — the years of happiness, and the loss, and the daughter who looked upward with her mother's eyes.`
  },
  {
    id: "fs028",
    title: "The Wise Owl of Aceh",
    titleId: "Burung Hantu Bijaksana Aceh",
    region: "Aceh",
    kingdom: "Aceh Sultanate",
    category: "fable",
    summary: "A story of a wise old owl who mediates between the animals of the forest and teaches them that wisdom is shared, not hoarded.",
    characters: ["The Owl Elder", "The Tiger", "The Deer", "The Mousedeer"],
    moral: "True wisdom is not possessing knowledge — it is knowing how to share it for the good of all.",
    fullText: `In the great rainforest of Aceh, where the trees are so old they have forgotten being saplings, there was a council of animals that met once every full moon in a clearing near the river.

The oldest among them was an owl — so ancient that he had watched three generations of tigers come and go. The animals called him Pak Huhu, for the sound he made.

For generations, Pak Huhu had served as the council's arbiter. When the tigers claimed too much hunting ground, he mediated. When the deer wanted new grazing paths, he helped plan. When the monkeys and the birds argued over the fruit trees, he found the balance.

But Pak Huhu was very old. His feathers were white now, and his eyes sometimes closed in the middle of council. The animals worried: who would take his place when he was gone?

A young tiger — bold, strong, certain of himself — declared that he should be the next arbiter. He had the greatest strength. Surely strength was the basis of wisdom?

A wise mousedeer (kancil) objected. "Strength is useful," she said carefully, choosing her words. "But the arbiter must be trusted by the mice as much as the tigers. If only the strong can be wise, the council only serves the strong."

The young tiger scoffed. "A mousedeer telling tigers about leadership? Absurd."

Pak Huhu opened one eye. He had been listening.

"Let me tell you," he said, in his slow, deliberate way, "what wisdom is. It is not what you know. It is what you do with what you know. I have lived long enough to learn this: the strong do not need wisdom to protect themselves. They need wisdom to protect those weaker than themselves. Any fool with claws can dominate. Only the genuinely wise can serve."

He turned to the mousedeer. "What would you do, little one, if a drought came and the river fell low — who would get water first?"

The mousedeer thought. "I would make sure the smallest and youngest drank before the largest and oldest. The large can wait. The small cannot."

Pak Huhu nodded. He looked at the young tiger.

The tiger said nothing for a long time. Then: "I would not have thought of that."

"That," said Pak Huhu, "is the beginning of wisdom."

He died before the next full moon. The council chose the mousedeer as arbiter. She was so small that tigers could have crushed her with one paw. She served for seventeen years and the forest was the most peaceful it had ever been.`
  },
  {
    id: "fs029",
    title: "The Princess and the Pandanus",
    titleId: "Putri Pandan Berduri",
    region: "Riau Islands",
    kingdom: "Sriwijaya",
    category: "origin-story",
    summary: "The origin story of the thorny pandanus plant — once a beautiful princess who was cursed by a jealous witch, now protecting the coastline of Riau.",
    characters: ["Putri Mayang Sari", "The Sea Witch", "The Prince of Bintan"],
    moral: "Beauty that serves others endures, even transformed beyond recognition.",
    fullText: `On the island of Bintan in the Riau archipelago — in the era when the sea lanes were controlled by the Sriwijayan empire — there was a princess named Mayang Sari. She was said to be the most beautiful woman on any island visible from any other island, and sailors marked their position not by stars but by looking for the tower of her palace.

A prince of Bintan had fallen in love with her. He had won her father's approval and they were to marry on the day of the next full moon.

But there was a sea witch who also loved the prince — or at least coveted him. She was ancient and powerful, with dominion over the tides and the creatures beneath. She was furious.

On the night before the wedding, she crept to the shore beneath the princess's window and whispered a curse into the salt air.

When Mayang Sari woke the next morning, she felt strange — heavy, rooted, as if her feet had grown into the floor. She tried to walk and could not. She looked down and saw that her feet had become roots, spreading into the earth. By midday, she was to her knees in soil. By sunset, she was fully a plant — a tall, spreading tree with long, sword-like leaves edged with spines.

The pandanus plant.

The prince searched the palace in despair. He never found her. But he walked to the shore that evening and found, growing new from the sand above the high-tide line, a tree he had never seen before. Something made him sit beside it.

He fell asleep there. In his dream, the princess spoke to him through the sound the leaves made in the wind. She told him what had happened. She told him not to grieve too long. She told him: I am here, along every shore. I will always be here.

The pandanus is now one of the most important coastal plants in Southeast Asia. Its leaves are used in cooking — giving rice and kuih their distinctive fragrance. Its aerial roots hold the sand in place during storms, protecting coastlines. Its fruit feeds birds and small animals.

In the Riau archipelago, elders say you should always greet a pandanus plant politely when you pass. You never know who it might be, listening.`
  },
  {
    id: "fs030",
    title: "Mbok Randha Dadapan — The Generous Widow",
    titleId: "Mbok Randha Dadapan",
    region: "East Java",
    kingdom: "Majapahit",
    category: "fairy-tale",
    summary: "A poor widow gives her last food to a disguised divine beggar, and is rewarded with a magical grinding stone that produces rice endlessly.",
    characters: ["Mbok Randha (Widow)", "The Divine Beggar", "Neighbors"],
    moral: "Generosity in times of scarcity is the truest form of faith.",
    fullText: `Near the banks of the Brantas River in East Java, in a small village that sat between the great rice fields, there was a widow called Mbok Randha. She was old and alone. Her children had grown and moved away. Her husband had died in the last flood.

She owned almost nothing: a clay pot, a sleeping mat, a small garden, and a grinding stone for processing rice.

One dry season, the rice failed and the river ran low. The whole village was hungry. People ate lesser things — roots and banana flowers and boiled taro leaves.

One morning, Mbok Randha had only a handful of rice left — enough for one meal, maybe two if she was careful. She was making her morning fire when she heard a voice at her gate.

An old man stood there — thinner than her, which she would not have thought possible. His clothes were worse than rags. His feet were bare and bleeding.

"Grandmother," he said, "I have been walking for three days. Could you spare anything? Even rice water?"

Mbok Randha looked at her handful of rice. She looked at the old man.

She took the rice — all of it — and made a simple porridge. She set it before him and apologized that she had nothing better.

The old man ate slowly and carefully, thanking her between each spoonful, as if it were a feast.

When he was done, he looked at her grinding stone in the corner of the kitchen.

"May I touch it?" he asked.

She said yes. He placed both hands on the surface of the stone and closed his eyes for a moment. Then he stood, thanked her again, and walked down the road.

She watched him go, wondering how she would eat.

Then she heard a sound from her kitchen — a soft, continuous sliding, like grain falling. She went to look.

Rice was flowing from her grinding stone. A slow, steady trickle of white grains, piling on the floor.

She scooped it up. Put it in a pot. Came back. More rice.

She called her neighbors. They came and brought pots and baskets. The stone kept flowing. By evening, every family in the village had enough rice for a week.

The stone never stopped flowing, exactly — but it knew the measure of what was needed. When Mbok Randha was comfortable, the trickle slowed. When she had guests, it flowed more. When neighbors came hungry, it flowed fast.

She never turned anyone away from her door again. And she never ran out of rice.`
  },
  {
    id: "fs031",
    title: "The Giant Buto Ijo and the Seven Wells",
    titleId: "Buto Ijo dan Tujuh Sumur",
    region: "Central Java",
    kingdom: "Mataram Kuno",
    category: "legend",
    summary: "A village is terrorized by a green giant demanding tribute, until a clever young woman defeats him using water from seven wells that correspond to the seven directions.",
    characters: ["Rara Wening (Young Woman)", "Buto Ijo (Green Giant)", "Village Elder"],
    moral: "Intelligence directed by compassion is the most powerful force there is.",
    fullText: `In a mountain village in Central Java, surrounded by seven hills, the people had lived peacefully for generations. They grew rice, kept goats, made batik, and told stories in the evenings.

Then Buto Ijo came.

The Green Giant appeared one harvest season, demanding tribute: a quarter of the rice, two buffalo, and twelve baskets of fruit — every month. If they refused, he would destroy the village.

He was enormous — twenty feet tall, his skin the green of jungle shadow, his teeth yellow and enormous. The people paid. They had no choice.

But a young woman named Rara Wening, who was known for being both clever and stubborn, would not accept this.

She spent a month consulting the old women of the village, the ones who remembered the older stories. The oldest woman told her: there are seven wells on this mountain, one on each slope facing each direction. Each holds different water — the water of the north well is cold; the south well's water is slightly warm; the east well runs fast; the west well runs slow. The others have their own qualities.

Rara Wening mapped the wells. She drew the plan on banana leaf and sat with it for three days, thinking.

She went to each well and drew a small amount of water into seven clay pots.

Then she sent word to Buto Ijo: the village would pay tribute no more, and she challenged him to come to the center of the village where she would fight him herself.

He came, laughing. She was just a woman!

She threw the first pot of water — north-well water — at his feet. The ground froze beneath him. He slipped.

She threw the second pot — south-well water — at his chest. It steamed where it hit him, like acid.

Third pot — east-well water — hit his eyes, moving so fast it temporarily blinded him.

Fourth pot — west-well water — made his limbs sluggish, as if he moved through mud.

By the time she threw the fifth, sixth, and seventh pots, combining the properties of all seven waters around him, Buto Ijo was completely trapped — bound by cold and heat and speed and slowness, unable to advance, unable to retreat, his magical strength cancelled by the mountain's own force.

He roared and struggled. Then he howled.

Rara Wening walked to his face and looked him in the eye.

"You can leave," she said, "and never return. Or you can stand here until you are stone."

He left. He was never seen near the village again.

Rara Wening became the village's protector, and when she grew old, the seven wells she had visited were named for her — and the people cleaned them each year at harvest time, as a way of thanking both the mountain and the woman who had understood it.`
  },
  {
    id: "fs032",
    title: "The Magic Mortar of Sulawesi",
    titleId: "Lesung Ajaib Sulawesi",
    region: "South Sulawesi",
    kingdom: "Gowa",
    category: "fairy-tale",
    summary: "A poor Bugis farmer receives a magical rice mortar that pounds rice by itself — but his greediness leads him to demand more than it can give.",
    characters: ["Datu Pali (Farmer)", "Spirit of the Mortar", "Datu Pali's Wife"],
    moral: "Contentment with what is given is itself a form of wealth; greed destroys what gratitude would preserve.",
    fullText: `In the Bugis lands of South Sulawesi, where the rice fields stretch to the edge of the sea and the fishermen sail the same routes their ancestors traced five hundred years ago, there was a farmer named Datu Pali.

He was poor — truly poor, not just modest. His rice field was small and infertile. His house leaked. He worked hard and still his family ate only twice a day, never three times.

One morning he went to his field before dawn and found, standing in the center of the dry soil, a wooden rice mortar. Large, smooth, old-looking, with patterns carved around its rim that he had never seen before.

He went closer. As he reached out, the mortar moved — just slightly — and the pestle inside it began to move by itself, grinding, grinding, though there was no rice inside it.

"What are you doing?" he asked it.

"Showing you what I can do," the mortar said, in a voice like wood knocking on wood. "I can pound rice without hands. I can work all night. I ask only to be treated with respect — kept clean, kept in the house, spoken to politely."

Datu Pali took the mortar home, weak with disbelief. That night he poured in their small store of rice. By morning, the mortar had produced three times the flour. That day his wife made rice flour cakes they sold at the market. With the money they bought more rice, which the mortar tripled.

Within months, they were comfortable. Within a year, they were well-off. The mortar worked every night and asked nothing.

Then Datu Pali's friends began to gossip about his fortune. He became sensitive — what if they thought he was hiding how rich he truly was? What if there was more he could ask for?

One night he told the mortar: "I need you to produce gold, not just rice."

The mortar was silent.

"Gold," he said again, louder. "Can you produce gold?"

"I can produce what rice produces," the mortar said. "That is my nature. I am a rice mortar."

"Then you are useless to me," Datu Pali snapped.

The mortar stopped. It went quiet in a way that was different from its ordinary silence. In the morning, when Datu Pali went to pour in rice, the mortar was just wood. Ordinary, unmoving, ordinary wood.

He spent the rest of his days telling the story as a warning: not to make the spirit feel small. Not to trade what you have for what you imagine you deserve.

His wife, who had always treated the mortar kindly, said nothing. She made her cakes with her own hands after that, and they were, she thought, nearly as good.`
  },
  {
    id: "fs033",
    title: "The Origin of the Rafflesia Flower",
    titleId: "Asal Usul Bunga Rafflesia",
    region: "West Sumatra",
    kingdom: "Minangkabau",
    category: "origin-story",
    summary: "The legend of how the largest flower in the world came to be — the transformed heart of a forest spirit who sacrificed herself to save a dying ancient tree.",
    characters: ["Bundo Pusako (Forest Spirit)", "The Ancient Dipterocarp Tree", "The Young Warrior"],
    moral: "The greatest sacrifices transform into the greatest wonders.",
    fullText: `In the deep rainforest of Sumatra, where the trees are older than any kingdom, there lived a forest spirit named Bundo Pusako — "Ancestral Mother." She was the guardian of the oldest section of the forest, where the ancient dipterocarp trees grew so tall their tops were in the clouds.

Chief among her charges was one enormous tree — so old it had been a sapling when the first Minangkabau ancestors walked the land. Its roots went deeper than any well. Its canopy sheltered thousands of species. It was the heart of the forest.

One season, a disease came into the forest — a blight that moved from tree to tree, entering through the roots, yellowing the leaves, collapsing the trunk from within. It came for the ancient tree.

Bundo Pusako fought it with everything she had: prayers, sacred water from the mountain springs, herbs and incantations passed down from the spirit world. Nothing stopped it.

A young forest warrior — a human boy who had grown up near the ancient tree and loved it as a guardian — saw her struggling. He came to help, though he was just a boy with no supernatural powers.

He asked: "What would save it?"

Bundo Pusako said: "The blight can only be neutralized by a sacrifice of pure love — something given freely, with no expectation of return."

The boy said: "Take my life. I give it freely."

Bundo Pusako wept — she had not expected this from a child. "No," she said. "I will give mine."

She pressed herself against the roots of the ancient tree and let herself dissolve — her spirit, her form, everything — into the roots, fighting the blight from within.

The tree recovered. Its leaves came back, greener than before. Its roots went deeper. For generations afterward, it was the most magnificent tree in the entire forest.

But from its roots, something grew that had never grown there before: a parasitic plant with a single flower — enormous, red-brown, with the smell of decay. No leaves. No stem. Just the flower, erupting from the roots.

It was Bundo Pusako. Transformed, not gone.

The Rafflesia arnoldii — the largest individual flower on earth, found only in Sumatran forests, parasitic on the roots of Tetrastigma vines — blooms rarely, for only a few days, and then is gone.

The Minangkabau people say you should not shout near a Rafflesia. It is a spirit listening.`
  },
  {
    id: "fs034",
    title: "The Dragon of Komodo",
    titleId: "Legenda Naga Komodo",
    region: "Nusa Tenggara",
    kingdom: "Nusantara",
    category: "legend",
    summary: "The traditional Ata Modo people's story of how the Komodo dragon came to share their island — descendants of a dragon princess who gave birth to both human and dragon children.",
    characters: ["Putri Naga (Dragon Princess)", "Melo (Human Father)", "Ora (Dragon Child)", "Human Twin"],
    moral: "All living things on this island are family — treat them accordingly.",
    fullText: `The Ata Modo people — the original inhabitants of Komodo Island — tell a story of origin that explains their relationship with the great monitor lizards who share their island, who they call Ora.

In the beginning, Putri Naga was a princess of the dragon world — a being of the sea and stone and ancient power, who had taken human form to walk the island. She was lonely in the way that very old, very powerful beings are lonely — she could walk in the human world but she could not quite be human.

She met a man named Melo, a fisherman and hunter, who saw her sitting on the shore at night when the stars were low. He was not afraid. He sat beside her and they talked until dawn. He came back the next night. And the next.

They fell in love and married, and in time she bore twins.

One was a human child — normal, crying, warm, ordinary in the most miraculous way.

The other was an Ora — a great monitor lizard, slow-blinking, with a forked tongue, already ancient-looking even as a hatchling.

Melo was afraid of the second child. He did not want it in the house.

Putri Naga said: "Both are our children. They came from the same love. You must never harm one for the sake of the other."

She raised the human child in the village and the Ora child in the forest and on the beach, teaching the island's human inhabitants to understand: the Ora are not enemies. They are family of a kind. They were born from the same union of humanity and the natural world.

The Ata Modo people still carry this understanding. When an Ora approaches their village, they speak to it — gently, carefully, respectfully. They do not hunt it. They believe that to harm a Komodo dragon is to harm a sibling.

Scientists now know the Komodo dragon is the largest living lizard on earth, a creature that can weigh 70 kilograms, that has been on these islands for millions of years. It carries saliva with over fifty bacteria and a mild venom. It has no natural predators.

The Ata Modo look at the Komodo dragon and see a cousin.

Maybe, from a certain angle, they are right.`
  },
  {
    id: "fs035",
    title: "The Heavenly Gamelan of Dieng",
    titleId: "Gamelan Kahyangan Dieng",
    region: "Central Java",
    kingdom: "Mataram Kuno",
    category: "myth",
    summary: "The story of how gamelan music came to Java — given by the gods at the Dieng Plateau, and how a young musician was transported to the heavenly realm when he played it perfectly.",
    characters: ["Batara Guru (Chief God)", "Mpu Sangkala (Musician)", "Celestial Dancers"],
    moral: "Music that reaches perfection briefly touches the divine.",
    fullText: `The Dieng Plateau in Central Java — a high, fog-covered plain of volcanic lakes and ancient temples — is called the "Abode of the Gods." It sits more than two thousand meters above sea level, cold and quiet, wrapped in mist even in dry season.

The people who lived near Dieng in the ancient times believed the plateau was where the boundary between the human world and the heavenly realm was thinnest.

In the time of Mataram Kuno, a musician named Mpu Sangkala lived at the edge of the plateau. He played every traditional instrument — flute, gong, kendang drum, saron, gender — with extraordinary skill. But he was always reaching for something more: a sound he heard in the mist and the wind that he could not quite reproduce with anything made of human hands.

One morning at Dieng, he sat at the edge of the largest sacred lake and played his saron — a bronze xylophone — for hours, improvising melodies that followed the movement of the mist across the water.

Batara Guru heard it from the heavenly realm.

The god looked down and saw the musician and his longing. He sent a celestial messenger down through the mist with a gift: a set of bronze instruments unlike anything on earth — gongs of perfect pitch, drums whose heads were stretched from the hide of a divine ox, saron keys so fine they vibrated with the frequency of prayer.

This was the heavenly gamelan — the prototype of all gamelan ensembles since.

Mpu Sangkala took the instruments and played. The sound that came out was too perfect for this world. The mist at Dieng parted. The sky above the plateau opened. Celestial dancers appeared on the edges of the lake, moving to the music.

Mpu Sangkala played through the night and into the next day. He forgot to eat. He forgot to sleep. He forgot the cold.

When the sun set on the second day, his students came looking for him and found only the set of heavenly instruments on the edge of the lake. Mpu Sangkala was gone.

He had been taken to the heavenly realm to play for the gods themselves, where his music would never have to stop.

The instruments he left behind became the most sacred gamelan set in Java. They were kept in the temple at Dieng for generations, played only on the most sacred ceremonial days, when the mist came down and the boundary between worlds was thin again.

Every gamelan ensemble in Java and Bali is descended, in one way or another, from that original set.`
  },
  {
    id: "fs036",
    title: "The Faithful Parrot of Ternate",
    titleId: "Burung Beo Setia Ternate",
    region: "Maluku",
    kingdom: "Ternate Sultanate",
    category: "fable",
    summary: "A sultan's parrot discovers that his most trusted advisor is plotting against him, and must find a way to reveal the truth without being believed — it's only a bird, after all.",
    characters: ["The Parrot (Burung Beo)", "Sultan of Ternate", "The Treacherous Vizier"],
    moral: "Truth finds a way to surface, even from the most unlikely messenger.",
    fullText: `In the spice islands of Maluku, in the Sultanate of Ternate where the clove trees grew thick on the volcanic slopes and the harbor was always full of trading ships, there was a sultan who kept a green parrot.

The parrot was extraordinary — it could mimic any voice it heard, and had been trained from a chick to speak. It lived in the throne room and had heard, over its long life, more state business than most ministers.

The sultan's most trusted advisor was a vizier named Mukhtar. Mukhtar was elegant, educated, always perfectly groomed. He had served the sultan for fifteen years and had never given cause for suspicion.

But the parrot had seen something.

One night when the sultan was away inspecting the clove harvest, Mukhtar had met in secret with the representatives of a rival power — a Portuguese trader with connections to the colonial authorities. The parrot, in its covered cage in the corner, had heard every word. The vizier was selling shipping routes. He was selling the names of the sultan's informants. He was selling loyalty.

The parrot could not write. It could not draw. It was a bird.

But it could speak.

The problem was: if it simply repeated what it had heard, Mukhtar would claim the parrot had been trained to say lies — that an enemy of the vizier had taught it the words to slander him. How could a sultan believe a parrot over his most trusted minister?

The parrot thought about this for a week — in bird-time, a very long time.

Then it had an idea.

The next time Mukhtar was alone in the throne room with the sultan, reviewing documents, the parrot — still in its covered cage — began to "practice" the words it had heard. It mimicked Mukhtar's own voice first: "Yes, the shipping routes through the eastern channel..." Then the Portuguese trader's voice: "And what of the informants' names...?" Then Mukhtar again: "I will provide a full list..."

The sultan looked up.

Mukhtar went pale.

The sultan rose slowly from his throne. "Parrot," he said, "say that again."

It did.

Mukhtar tried to explain, to protest, to accuse the parrot of being trained by enemies. But his pale face said everything the parrot's words had already said.

The sultan had him investigated that same day. Documents were found. The evidence was real.

Mukhtar was removed. The parrot was given a perch of polished teak and fed the finest fruits from the palace garden for the rest of its long life.

The sultan never again covered its cage at night.`
  },
  {
    id: "fs037",
    title: "Ramayana in Prambanan — The Java Telling",
    titleId: "Ramayana Versi Jawa",
    region: "Central Java",
    kingdom: "Mataram Kuno",
    category: "legend",
    summary: "The Javanese adaptation of the Ramayana epic — how Rama and Sita's story was woven into the stone reliefs of Prambanan temple and performed in the Sendratari Ramayana ballet.",
    characters: ["Rama (Prince)", "Sita (Princess)", "Hanoman (Monkey King)", "Ravana (Demon King)", "Laksmana (Brother)"],
    moral: "Devotion, honor, and loyalty are tested most severely — and proven most completely — in the darkest moments.",
    fullText: `The story of Rama comes from India, but in Java it became something else — it became Javanese. The stone carvers of Mataram Kuno carved the entire Ramayana onto the balustrades of Prambanan in the 9th century CE. Every night now, in full moon performances on the open stage facing the lit temple towers, Javanese dancers perform the story in gamelan and silence.

This is the Javanese telling:

Prince Rama of Ayodhya was the eldest son of the king, righteous and skilled in all the arts of war and peace. He was exiled by a political plot — his stepmother demanded that her son, Bharata, inherit the throne instead. Rama accepted the exile with perfect equanimity. His wife Sita and his loyal brother Laksmana went with him.

In the forest, the demon king Ravana — ten-headed, twenty-armed, ruler of the island Lanka — saw Sita and desired her. He sent a golden deer to distract Rama and Laksmana. When they gave chase, Ravana appeared and took Sita by force, carrying her across the sea to Lanka.

Rama wept. Then he straightened and began to plan.

In the forest, he found the monkey kingdom led by the exiled prince Sugriva. He helped Sugriva reclaim his kingdom, and Sugriva gave him an army. Chief among his allies was Hanoman — the white monkey son of the wind god, capable of flight, of transformation, of extraordinary feats.

Hanoman leaped across the sea to Lanka — it is said he expanded his body until he was the size of a mountain, then compressed himself to the size of a cat to infiltrate the city. He found Sita in Ravana's garden and gave her Rama's ring as proof that rescue was coming.

The war that followed was immense — armies of monkeys against armies of demons, divine weapons against magical armor. The stone reliefs of Prambanan show every episode: the sea crossing, the battles, the grief.

In the end, Rama's arrow — blessed by the gods — found Ravana's one vulnerable point. The demon king fell.

Sita was freed. But Rama, in the original telling, required Sita to prove her purity by walking through fire — a moment that has troubled readers for centuries. The fire did not harm her. She emerged, unburned.

The Javanese telling softens this, or moves past it quickly. What matters in the Javanese version is not the trial but the reunion — the quality of love demonstrated through separation, loyalty, and the willingness to cross oceans.

At Prambanan's open-air theater, when the dancers perform and the temple towers glow behind them, and Hanoman leaps across the stage in white cloth and fire, and the gamelan builds and builds toward the final battle — the audience, even those who know every episode by heart, lean forward.

Because the story is not about events. It is about what those events reveal about the people in them.`
  },
  {
    id: "fs038",
    title: "The Gold-Weaving Spider of Palembang",
    titleId: "Laba-Laba Penenun Emas Palembang",
    region: "South Sumatra",
    kingdom: "Sriwijaya",
    category: "fairy-tale",
    summary: "A poor weaver woman is taught by a magical golden spider to weave the sacred songket pattern — the secret origin of Palembang's famous gold-threaded textile.",
    characters: ["Ratu Tumanggung (Weaver)", "The Golden Spider", "Sultan's Court"],
    moral: "Knowledge given freely by nature is a sacred gift — share it generously and it multiplies.",
    fullText: `In the era when Palembang was the beating heart of Sriwijaya — when the harbor was full of ships from China, India, Persia, and Arabia — a poor weaving woman named Ratu Tumanggung lived on the river's edge.

She was a good weaver. She could make cloth that was sturdy and beautiful in the traditions she had been taught. But she had seen the cloth that arrived on the trading ships from afar — cloth so fine it seemed woven from light itself — and she wanted to make something like that.

She prayed at the river each morning for guidance.

One day she noticed a spider — bright gold, with legs so delicate they seemed made of wire — building its web between two posts at the corner of her loom. She watched it work, mesmerized. The web it built was extraordinary: not the ordinary concentric spiral, but a complex interlocking pattern, symmetrical and intricate.

She recognized something in the pattern.

She began to weave it. The geometry of the spider's web, translated into the movements of her shuttle and the tension of her threads. Where the spider used silk, she used gold thread — thin strips of beaten gold wrapped around silk core, which the Sriwijayan merchants sold in the market.

It took her three months to complete one length of cloth.

When she brought it to the market, a merchant from the royal court saw it and stopped walking.

He bought it immediately, at a price she named without thinking, and regretted immediately for naming too low.

The cloth went to the Sultan's palace. The Sultan's wife wore it to a feast. Visitors from every kingdom in Nusantara saw it and asked where it came from.

Ratu Tumanggung became the most sought-after weaver in Palembang. She taught her daughters, and they taught their daughters. The pattern the golden spider had shown her became the foundation of Palembang's famous songket — the gold-threaded cloth still woven today in the workshops along the Musi River.

Each songket weaver in Palembang knows this story. They say the first pattern — the one the spider made — is still hidden inside every songket design, if you know how to look.

And if you watch a spider building its web in the corner of a loom, you do not brush it away. You let it work.`
  },
  {
    id: "fs039",
    title: "The Singing River of Mahakam",
    titleId: "Sungai Mahakam yang Bernyanyi",
    region: "East Kalimantan",
    kingdom: "Kutai",
    category: "myth",
    summary: "The Mahakam River is said to sing at certain bends — a song heard only by those who are quiet enough, the voice of the river remembering everything it has witnessed.",
    characters: ["The Mahakam River Spirit", "Purnawarman (Ancient Dayak Chief)", "A Young Fisherman"],
    moral: "The natural world has its own memory — listen, and it will tell you everything.",
    fullText: `The Mahakam River runs through the heart of East Kalimantan — brown and wide, moving slowly through forests that have stood for millions of years, past villages where the Dayak people have lived since before memory.

The people of the Mahakam say the river sings.

Not always. Not everywhere. But at certain bends, particularly at dusk, when the light turns gold and the river is in shadow, you can hear it — a low, complex sound, like many voices at once, neither happy nor sad, just... present.

Elders say it is the river remembering.

The Mahakam has witnessed everything: the rise and fall of the Kutai kingdom (the oldest Hindu kingdom in Indonesia, from the 4th century CE), the coming of Hindu missionaries from India, the spread of Islam, the Dutch and their coal mines, the logging companies, the oil fields, the flooding. It has carried all of it in its current.

A young fisherman named Bagas heard the singing one evening and was transfixed. He stopped paddling and let his canoe drift. The sound filled him.

When he returned to the village, he told the elder what he had heard.

The elder nodded. "Sit still when you hear it," he said. "The river is not singing for entertainment. It is singing because it remembers, and remembering is a kind of singing."

"What does it remember?" Bagas asked.

"Everything. Every body committed to its current. Every flood. Every year the forest burned. Every year the rains were good. Every fisherman who thanked it, and every one who didn't."

Bagas went back many times. He never stopped listening. He grew old on the river. He became an elder himself, and passed the story on.

The Mahakam still sings. The Dayak people still listen. Scientists call the sound the interaction of the river current with underwater formations — a perfectly reasonable explanation that in no way contradicts the elder's understanding.

The river sings. That is simply true.`
  },
  {
    id: "fs040",
    title: "Nyi Pohaci Sanghyang Sri — Sunda Rice Goddess",
    titleId: "Nyi Pohaci Sanghyang Sri",
    region: "West Java",
    kingdom: "Sunda",
    category: "myth",
    summary: "The Sundanese telling of the rice goddess origin — how a divine being named Pohaci was born from a cosmic egg and her sacrifice created rice, the foundation of Sundanese civilization.",
    characters: ["Nyi Pohaci Sanghyang Sri", "Batara Guru", "The First Ancestors"],
    moral: "Life feeds on life — and every harvest is a renewal of the oldest covenant.",
    fullText: `The Sundanese people of West Java have their own telling of how rice came to be, different from the Javanese version, rooted in their own understanding of the cosmos.

In the beginning, when the world was being organized, Batara Guru created a cosmic egg from which would come the being who would feed humanity. The egg was placed in the care of the divine realm and tended carefully.

When it hatched, a being of pure light emerged — neither fully male nor fully female, but complete in itself. This was Nyi Pohaci Sanghyang Sri.

She was perfect. She was too perfect for the human world — too fragile, too luminous, too sacred to be touched by the rough hands of earth.

But humanity was hungry. The people below had tubers and roots and wild berries, but no grain — nothing that could sustain a civilization, feed armies, build kingdoms.

Batara Guru went to Nyi Pohaci and asked her for the greatest sacrifice: to give herself to the earth, to dissolve her perfect divine form into the soil of the human world, so that from her body could grow the plant that would feed all people.

She agreed without hesitation. Not because she was commanded to, but because she saw the hunger below and wanted to answer it.

She descended to the earth and lay down in a field. From her body grew rice — tall, green, heavy with grain. Each part of her became a different quality: her eyes became the sweetest grains, her hair became the stalks, her voice became the rustling sound rice makes in the wind.

But she did not disappear entirely. Her spirit became the dewi (goddess) of rice — present in every rice grain, in every paddy field, in every granary.

The Sundanese have elaborate rituals connected to this belief. At harvest time, the first cut of rice is called Sri — the body of the goddess. A bundle of the finest stalks is tied with red and white cloth, decorated with flowers, and carried in procession to the storage barn. It is placed there first, gently, the way you would place a sleeping child.

No one shouts in the granary. No one argues. The goddess is resting there.

When the new season comes and planting begins, a ceremony called seren taun is held — a week of thanksgiving for the harvest just completed and prayer for the one ahead. Music, dance, processions, offerings.

All of it for Nyi Pohaci Sanghyang Sri, who fed the people she had never met with the only thing she had to give.`
  },
  {
    id: "fs041",
    title: "The Seven Daughters of the Sea",
    titleId: "Tujuh Putri Laut",
    region: "Bangka Belitung",
    kingdom: "Sriwijaya",
    category: "legend",
    summary: "Seven celestial sisters dive into the sea near Bangka Island and become the guardian spirits of the seven major sea lanes of the Sriwijayan empire.",
    characters: ["The Seven Sisters", "The Sea God Poseidon (Dewa Laut)", "Sriwijayan Admiral"],
    moral: "Those who dedicate themselves to protecting others are never truly lost.",
    fullText: `In the age of Sriwijaya, when the maritime empire ruled the sea lanes between Sumatra and the Malay Peninsula, the waters between Bangka Island and the Belitung archipelago were some of the most dangerous in Nusantara.

Storms came without warning. Reefs lurked below the surface. Pirates used the island channels to ambush merchant vessels. Even experienced sailors feared these waters.

There was a legend, told by the sailors who worked those routes, of seven young women who had lived on Bangka Island in the time before Sriwijaya. They were sisters — daughters of a minor raja — who had been taught to sail and dive by their father, who had no sons and refused to let that stop his daughters from learning what he knew.

They became extraordinary seafarers. They knew every reef, every current, every storm pattern.

When their father died, the sisters decided to do something no one had done before: they dove into the seven main channels around Bangka and Belitung and breathed themselves into the sea. They became part of it — spirit guardians, woven into the currents.

Sailors who made offerings before entering the straits — flowers, rice, coconut, incense dropped into the water — found their voyages went smoothly. Ships that entered without ceremony sometimes heard singing beneath the hull just before a reef, or felt a strange current that nudged them away from danger.

A Sriwijayan admiral named Laksmana Bahari was crossing the strait in a storm so severe that even his most experienced crew despaired. He had already lost sight of the stars. He was navigating by instinct alone.

Then he heard it: singing, very faint, below the hull. A melody that seemed to trace a path through the dark.

He followed it. The singing led him, turn by turn, through the storm, past the reefs, into safe harbor.

In the morning, he threw flowers and incense into the sea and spoke aloud: "I don't know which of you I am thanking, but thank you."

A small wave came, though the sea was calm. Just one wave, from no particular direction. Then the water was still again.

The seven sisters of Bangka are still remembered in the fishing communities of the island. Boats still leave offerings at the straits. Not everyone does it. But the ones who do tend to come home.`
  },
  {
    id: "fs042",
    title: "Hang Tuah — The Malay Warrior of the Strait",
    titleId: "Hang Tuah",
    region: "Riau / Malay World",
    kingdom: "Malacca Sultanate",
    category: "legend",
    summary: "The legend of Hang Tuah, the greatest warrior and most loyal subject of the Malacca Sultanate, whose unwavering loyalty to his Sultan — even when ordered to his own death — became the ideal of Malay manhood.",
    characters: ["Hang Tuah", "Sultan of Malacca", "Hang Jebat (Friend)", "Tun Perak (Bendahara)"],
    moral: "The question of whether loyalty to a ruler can override personal justice has no easy answer — it is the central tension of every civilization.",
    fullText: `The Hikayat Hang Tuah — the Legend of Hang Tuah — is one of the great epics of the Malay world, set in the golden age of the Malacca Sultanate in the 15th century.

Hang Tuah was born to a humble family but possessed extraordinary talent — for fighting, for swimming, for languages, for the art of peace and the art of war. From childhood he trained with four friends: Hang Jebat, Hang Kasturi, Hang Lekir, and Hang Lekiu. Together they became the sultan's most loyal warriors.

Hang Tuah rose to become the sultan's greatest champion. He journeyed to Java, to India, to China. He won every contest of arms. He negotiated impossible treaties. His name became synonymous with loyalty — "Takkan Melayu hilang di dunia" (Malays will never disappear from the earth) is attributed to him.

Then came the betrayal.

A jealous courtier accused Hang Tuah of an affair with one of the sultan's women. The sultan, in a rage, ordered Hang Tuah executed without trial.

The Bendahara (prime minister), Tun Perak, believed Hang Tuah was innocent. He could not save him openly. So he hid Hang Tuah in the forest and reported to the Sultan that the execution was done.

Hang Jebat, Hang Tuah's closest friend, was outraged. He believed his friend was dead. He went to the palace and began a rebellion — sleeping in the Sultan's chambers, sitting on the Sultan's throne, declaring that loyalty to an unjust ruler is not virtue but cowardice.

The Sultan, unable to stop Hang Jebat, finally learned the truth: Hang Tuah was alive.

He summoned Hang Tuah. He forgave him. He gave him back his position. And then he gave him a command: kill Hang Jebat.

This is the heart of the story — and its greatest agony.

Hang Tuah obeyed. He met Hang Jebat in combat. They had trained together since childhood. Neither could easily defeat the other. The fight lasted days. In the end, Hang Tuah used a trick — asking for rest, then striking while his friend was off guard.

Hang Jebat died. He died believing he had been right. He said so with his last breath.

Hang Tuah lived. He served the sultan until the end. He never fully recovered.

The Malay world has argued about this story for five centuries. Was Hang Tuah the hero, the ideal of loyalty? Or was Hang Jebat the true hero, who understood that blind loyalty to power is not virtue?

In modern Malaysia and Indonesia, this debate continues. Some say: Hang Tuah was right — order and loyalty are civilization. Others say: Hang Jebat was right — justice matters more than authority.

The epic does not resolve it. It just tells the story, and lets you sit with the weight of what both men chose.`
  },
  {
    id: "fs043",
    title: "The Origin of the Wayang",
    titleId: "Asal Usul Wayang",
    region: "Java",
    kingdom: "Kediri",
    category: "origin-story",
    summary: "How shadow puppetry was invented — by a king grieving for his dead son who had an artist make images of the boy to project onto cloth by lamplight so the king could see his son's shadow once more.",
    characters: ["King Sri Jayabaya", "The Artisan", "The Dead Prince", "The Dalang (Puppeteer)"],
    moral: "Art is born from the deepest human need — to keep what we cannot hold, to see what is gone.",
    fullText: `The origin of wayang — shadow puppetry — is told in several ways across Java. This is one of the oldest tellings.

King Sri Jayabaya of the Kediri kingdom had a beloved son. The prince was everything a king could want — brave, kind, intelligent, handsome. He died young, of a sudden illness, and the king's grief was total.

He could not eat. He could not hold court. He sat for days in his son's empty room, unable to accept the absence.

His most skilled artisan came to him and said: "I cannot bring him back. But let me make his image."

He carved a flat figure from white buffalo hide — the prince's silhouette, his distinctive profile, the line of his jaw, the shape of his arms. He used the finest tools he had.

He brought the figure to the king after dark. He lit an oil lamp and held the figure between the lamp and a white screen.

On the screen appeared the shadow of the prince. Moving slightly as the figure moved. Alive in the only way the dead can be alive — in the imagination, in the image, in the space between light and surface.

The king wept. Then he watched. He watched for hours.

He said: "Let him speak."

The artisan — who was also a storyteller — moved the figure and gave it the prince's voice as he remembered it, speaking the prince's favorite stories, his jokes, his observations about the kingdom.

From that night, the king commanded that more figures be made — the entire court, all the gods, the heroes of the Ramayana and Mahabharata — and that each night a performer would tell the great stories through their shadows.

The person who held the puppets and told the stories became the Dalang — the puppetmaster — the most important performing artist in Javanese culture. A great Dalang knows not just the stories but the music that accompanies each scene, the philosophy embedded in each character, the appropriate moment for comedy and the appropriate moment for silence.

A Dalang's performance lasts all night — literally, from sunset to dawn. By the end, the audience — having laughed, wept, reflected, dozed, and woken again — emerges into the early light with the feeling of having lived through something significant.

That is the original purpose. To see the shadows of those who are gone. To understand, through watching their stories, what it means to be alive.

Wayang kulit is now recognized by UNESCO as an Intangible Cultural Heritage. Hundreds of thousands of stories are known to the wayang tradition. Every one of them, at their deepest level, is the story of that king looking at his son's shadow on a white cloth, saying: speak to me. I am listening.`
  },
  {
    id: "fs044",
    title: "The Legend of Gunung Bromo",
    titleId: "Legenda Gunung Bromo",
    region: "East Java",
    kingdom: "Majapahit",
    category: "origin-story",
    summary: "The Tenggerese people's story of how Gunung Bromo came to be — a sacrifice made by a parent to protect their children from the volcano's wrath.",
    characters: ["Jaka Seger", "Roro Anteng", "Kesuma (Youngest Child)", "The Volcano Spirit"],
    moral: "The greatest love sacrifices itself so that those it loves can live.",
    fullText: `The Tenggerese people who live on the slopes of Mount Bromo in East Java have cared for the volcano as their ancestor and protector for centuries. They are Hindu in a region that is predominantly Muslim, and they trace their ancestry to the royal refugees of the Majapahit Empire who fled into the mountains as Islam spread through the lowlands.

This is their story of how Bromo came to be sacred, and why every year they throw offerings into the volcano's crater.

Jaka Seger and Roro Anteng were the founders of the Tenggerese people. They settled in the mountain valley, built their community, and prayed to the gods for children. Years passed. No children came.

Finally, in desperation, they climbed to the rim of the active volcano — which they called Bromo, from the Sanskrit "Brahma," the god of creation — and prayed directly to the spirit of the mountain.

A voice came from within the crater: "I will give you children. But the price is this: when you have twenty-five, you must give the youngest back to me."

They agreed, not knowing what it meant.

Twenty-four children came over the years — healthy, beautiful, the joy of their lives.

The twenty-fifth child was born: Kesuma. He was the brightest, the most beloved, the one who somehow completed what the others had started. Jaka Seger and Roro Anteng held him and could not imagine giving him up.

They tried to refuse. They prayed for an alternative. They offered other things.

The volcano answered with fire. Lava crept toward their village.

Then Kesuma himself spoke — though he was still a young child, his voice was calm. "I understand what must be done," he said. "I am willing. Do not let the fire take everyone. Let me go."

Before his parents could stop him, he walked to the rim of the crater and leaped.

The volcano quieted immediately. The lava stopped. The fires calmed.

The spirit of the volcano spoke: "I accept this offering. In return, Kesuma will be your protector forever. Come to the rim each year with offerings of fruit, rice, livestock — throw them into the crater. I will keep the mountain from harming you."

The Tenggerese have kept this covenant for centuries. Every year, at the festival of Kasada — on the fourteenth night of the twelfth month of the Tenggerese calendar — thousands of people climb Mount Bromo before dawn, make their way to the crater rim, and throw offerings into the fire below: vegetables, money, livestock, everything they have grown and earned in the year.

They do this not from fear, but from love — love for the son who gave himself, and faith in the covenant he made possible.`
  },
  {
    id: "fs045",
    title: "Calon Arang — The Widow of Girah",
    titleId: "Calon Arang",
    region: "Bali / East Java",
    kingdom: "Kediri",
    category: "legend",
    summary: "A Javanese-Balinese tale of a powerful widow-witch whose grief and anger at being socially rejected causes plague and disaster, until a wise holy man faces her with compassion rather than force.",
    characters: ["Calon Arang (Widow)", "Mpu Bharada (Holy Man)", "King Erlangga", "Ratna Manggali (Daughter)"],
    moral: "Cruelty answered with cruelty only creates more cruelty — wisdom knows when to offer understanding instead.",
    fullText: `In the kingdom of Kediri in the time of King Erlangga, there was a widow named Calonarang who lived in the village of Girah with her only daughter, Ratna Manggali.

Ratna Manggali was beautiful and accomplished — but no man would court her. The reason was her mother: Calonarang was known to be a practitioner of the dark arts, a leyak who could shapeshift and summon the dead. Mothers warned their sons away. No family would make the connection.

Ratna Manggali wept to her mother each night: "I am alone because of what you are."

And Calonarang wept too — privately, bitterly. She had not chosen to be feared. She had turned to dark knowledge because the world had given her nothing else. She was a widow with no support, no community, no place. She had survived by becoming powerful. And now her power was being used to punish her daughter for existing.

Her grief curdled into rage.

She began to send disease into the villages — invisible spirits that entered homes at night and caused fever, bleeding, death. The villages near Girah were devastated. Funerals every day. Children dying. King Erlangga sent armies. They fell sick before they reached Girah.

He sent a holy man: Mpu Bharada, the most respected scholar-priest in the kingdom.

Mpu Bharada went alone. He did not go with an army or an exorcism prepared. He went as a visitor. He sat at the gate of Calonarang's house and waited.

She came out, expecting a threat.

He said: "I came to speak with you. Not to fight you. If you wanted to be fought, you would have come out with fire."

She stared at him.

He said: "Your daughter has not married."

She said nothing.

He said: "I have a student. A good young man. He is afraid of nothing, including powerful women. Would you consider letting him court her?"

Calonarang was silent for a long time.

Then she allowed Ratna Manggali to meet the student. The young man was genuine. He fell in love with Ratna Manggali honestly, not as a trick.

The disease stopped.

Calonarang and Mpu Bharada talked for days about her knowledge of the dark arts — she was also, underneath everything, a scholar of enormous depth. He listened to her, argued with her, learned from her.

She eventually gave him the texts she had used — the lontar palm leaf manuscripts that contained the darkest of her knowledge. She gave them willingly, not defeated but choosing.

The plague stopped. The villages recovered. Ratna Manggali married.

Calonarang lived out her days in a strange kind of peace — not forgiven by the villages, not forgotten, but no longer at war.

The Calonarang story is performed as a ritual dance-drama in Bali to this day, as a way of purifying a village from disease or bad fortune. In the performance, she is always both villain and victim. The good dalang never lets the audience forget both things.`
  },
  {
    id: "fs046",
    title: "The Butterfly Princess of Flores",
    titleId: "Putri Kupu-Kupu Flores",
    region: "East Nusa Tenggara",
    kingdom: "Nusantara",
    category: "fairy-tale",
    summary: "A girl from Flores who can transform into a butterfly discovers that her ability is not a curse but a gift for her community — she can travel to find water in drought years.",
    characters: ["Sae (The Butterfly Girl)", "Village Elder", "The Drought Spirit"],
    moral: "What makes you different from others is often exactly what your community needs most.",
    fullText: `In a village on the island of Flores in East Nusa Tenggara, there was a girl named Sae who had a secret.

She could transform into a butterfly.

It had happened first when she was seven, without warning — a tightening, a shimmer, and suddenly she was small, winged, looking at her own empty dress from six feet above the ground. She flew around the room in panic. Then she calmed. She floated to the window.

The world from above was extraordinary.

She landed back in her dress and became herself again. She told no one.

For years she kept it secret, transforming only alone in the forest. She traveled in butterfly form to places no human could easily reach — the top of the cliffs above the sea, the centers of flower-filled valleys, the edges of other villages.

When she was seventeen, a drought came. It was the worst in living memory. The river dropped to a trickle. The wells dried to mud. The village elder went from house to house counting the water jars, calculating how long before it ran out.

Sae went to the elder and told him her secret.

The elder was quiet for a long time. Then he said: "Can you find water? From above?"

She flew the next morning at dawn — a small, iridescent figure rising over the village, over the brown hills, out toward the mountains. From above she could see what humans walking the ground could not: the dark line of moisture deep in the valley to the east, hidden by a ridge. A spring, still flowing.

She returned and guided the village men there — a three-hour walk on the ground, but she had seen the exact route.

They found the spring. They dug it wider. They carried water back. They were saved.

After that, Sae was not a secret. She was the village's wing-scout. In dry years, she flew. In planting season, she could tell from above which fields had the most moisture in the soil. When fishing boats were lost at sea, she flew to find them.

She lived an unusual life. She never fully felt she belonged to the ground or to the air. But she felt she belonged to the village.

When she died, very old, they say butterflies appeared at her funeral from everywhere at once — hundreds of them, all different colors, settling on the mourners and the grave and then rising, all at once, into the blue morning sky.`
  },
  {
    id: "fs047",
    title: "The Princess of the Lontar Palm",
    titleId: "Putri Pohon Lontar",
    region: "East Nusa Tenggara / NTT",
    kingdom: "Nusantara",
    category: "origin-story",
    summary: "The origin of lontar palm trees — the tall, straight palms of East Indonesia whose leaves were used for centuries as writing material — said to be the transformed remains of a scholar-princess.",
    characters: ["Suri (The Scholar Princess)", "The Astronomer King", "The Scribe"],
    moral: "Knowledge written down is the greatest gift a person can leave to the future.",
    fullText: `In the islands of East Indonesia — in Sumbawa and Flores and the islands between — the lontar palm stands tall and straight, its long fronds fanning against the blue sky. The leaves of the lontar palm were used for centuries as the writing material of the archipelago: dried, smoothed, and inscribed with a sharp stylus. The great poems, the royal histories, the medical texts, the star charts — all were written on lontar leaves.

The people of those islands say the lontar came from a princess.

Her name was Suri, and she was the daughter of a minor raja on a small island. She was not supposed to be a scholar — she was supposed to be married off, politically, when the time came. But her father was a practical man, and he taught all his children to read and calculate and observe the stars, because these skills were valuable to a ruler.

Suri was the most gifted of all his children. She memorized star charts before she could sew a straight seam. She learned the calendar systems of three different traditions. She wrote, on whatever material she could find — on the smooth undersides of bark, on dried banana leaves — her observations about the seasons, the tides, the behavior of migratory birds.

When her father's astronomy teacher died, she took over the duties quietly. No one objected — her work was too accurate to ignore.

But when a delegation came from a larger kingdom to ask for her hand in marriage, her father had to agree. She was taken away.

In her new husband's court, she was not allowed to practice scholarship. Women were for other purposes. She was given cloth and jewelry and was expected to manage the household. Her books were taken from her. She was not angry — she understood the world she lived in. But she was quietly, completely heartbroken.

She asked for one thing: to walk in the palace garden each morning. They allowed it.

She walked each morning to the tallest, straightest palm tree in the garden and stood beside it. She pressed her hands to the bark and spoke to it — reciting, from memory, every fact she knew. The star charts, the tide patterns, the medical uses of plants, the histories of seven kingdoms.

She spoke to the tree for years, every morning.

When she died, the tree was somehow different. The leaves seemed to hold more light. And when a scribe came to the garden and cut a leaf and pressed a stylus to its surface, the leaf took the inscription perfectly — smoothly, indelibly, with a quality unlike any other writing material.

The palace scribe began using the leaves. Word spread. The lontar palm became the writing material of the archipelago.

Scholars say the knowledge written on lontar leaves feels, somehow, like it was already there — just waiting to be found.`
  },
  {
    id: "fs048",
    title: "Toba's Daughter — The Flood's Memory",
    titleId: "Putri Toba — Ingatan Banjir",
    region: "North Sumatra",
    kingdom: "Batak",
    category: "myth",
    summary: "A companion story to the Lake Toba legend — told from the perspective of the daughter left behind, and what she learned about both her parents.",
    characters: ["Si Nangkok (Son)", "Samosir (Mother)", "Toba (Father)", "Si Nangkok's Children"],
    moral: "We carry our parents' stories in our bodies — the best and worst of what they did.",
    fullText: `(This is a companion story to the Lake Toba origin legend, told by an elder of the Batak Toba people.)

When the lake had formed, and the father stood on the Java shore and the mother floated beneath the water at the center, the son Si Nangkok was left on the Samosir side — the island that rose from the middle of the new lake, that bore his mother's name.

He grew up on Samosir. He married, had children, built a longhouse in the Batak way — the high-roofed saddle-shaped house with its carved gables. He farmed the volcanic soil and fished the lake that was his mother.

When his children asked where the lake came from, he told them the story. He was not ashamed of it — the whole truth, including his own part: that he had eaten the food meant for his father, that his father in anger had betrayed the promise, that his mother had disappeared into water.

His daughter, who was seven when he told her, asked: "Were you angry at your father?"

He thought for a long time. "Yes. And no. He forgot the promise because I made him angry first. If I had not eaten the food, he would not have been angry. If he had not been angry, he would not have broken the promise. If he had not broken the promise, your grandmother would still be here."

"So it was your fault?" the daughter asked.

"It was everyone's fault," he said. "And no one's fault. We were all just very human."

The daughter grew up and became a teacher — in the Batak tradition, a person who kept the stories and the genealogies and knew the proper ceremonies. She would tell the Lake Toba story in a particular way: never assigning blame, always showing how each choice followed from the last, how the lake is not a punishment but a consequence, and how consequences can be beautiful things.

She also taught this: that the mother — Samosir — had not left in anger. She had left because the conditions that made her staying possible had been broken. But she had not abandoned her child. The island in the center of the lake bore her name. The fish in the lake fed her son's family. The water irrigated their fields. The lake itself was the mother's continuing presence.

"Your grandmother," the daughter told her own children, "is the largest lake in Southeast Asia. She has not gone. She is simply in a different form. Every time we drink the water, we drink her. Every time the rain comes from the lake as mist and falls on our fields — that is her, still feeding us."

The Batak people of the Lake Toba region have the highest population density of any highland group in Southeast Asia. The volcanic soil is extraordinarily fertile. The lake never dries. The fishing is always good.

Some things end. Some things become the conditions for everything else.`
  },
  {
    id: "fs049",
    title: "The Prince Who Became a Tiger",
    titleId: "Pangeran yang Menjadi Harimau",
    region: "Jambi / South Sumatra",
    kingdom: "Sriwijaya",
    category: "legend",
    summary: "A cruel prince in the Sriwijayan territories is transformed into a tiger by a forest spirit as punishment for his hunting, but over generations his tiger descendants become the protectors of the village they once terrorized.",
    characters: ["Pangeran Rangga (The Prince)", "Forest Spirit", "The Tiger Clan Descendants"],
    moral: "Cruelty transforms us — but so does time, and sometimes what was made violent can learn protection.",
    fullText: `In the forest territories of what is now Jambi province, in the era of Sriwijayan influence, there was a prince named Pangeran Rangga who was famous for two things: his fighting ability and his love of hunting.

He hunted for sport, not food. He hunted until whole sections of the forest were emptied of deer, wild boar, and tapir. He hunted endangered animals for their pelts and their horns. He hunted the sacred white deer that the forest people had never touched for three generations.

The forest spirit who watched over the white deer — an ancient presence in the form of a tall woman with bark-skin and moss-hair — came to him one night at his campfire.

"You have taken what was not yours to take," she said. "You have emptied what took generations to fill. The white deer is gone. The balance is broken."

The prince laughed at her. He had a spear.

She raised one hand and he became a tiger.

He was enormous — a Sumatran tiger, orange and black — and for the first years of his tiger life he was exactly the same as he had been as a man: aggressive, territorial, taking what he wanted. He was feared through the forest.

But tigers live in the forest. They cannot leave. And gradually, season by season, the forest taught him what it had not been able to teach him as a human. He learned to take only what he needed. He learned that if the deer population collapsed, he would starve. He learned that the forest was a system, and that he was part of it rather than above it.

He had cubs. He taught them.

Generations passed. The descendants of Pangeran Rangga's tiger form became the tigers of that specific forest range — and the forest communities noticed something strange: these tigers never attacked the village. They circled at a distance, they appeared at the edges during dangerous seasons (floods, landslides), and they disappeared back into the forest when the danger passed. It was as if they were watching.

The community began to call them "harimau jadian" — transformed tigers. They left small offerings at the forest edge: a little meat, some cooked rice, a stick of incense. The tigers took what they wanted and left the rest.

The forest people of Jambi still speak of the harimau jadian — not as a threat, but as a kind of elder, watching the boundary between human and forest, making sure neither consumes the other.`
  },
  {
    id: "fs050",
    title: "The Night Market of the Dead",
    titleId: "Pasar Malam Arwah",
    region: "Java",
    kingdom: "Mataram Islam",
    category: "myth",
    summary: "The Javanese belief that the dead gather in a night market once a year during the month of Suro — and the story of a man who accidentally entered it and what he saw there.",
    characters: ["Pak Widodo (The Traveler)", "His Dead Grandmother", "The Market Keeper"],
    moral: "The dead do not leave entirely — they exist alongside us, just at a different frequency.",
    fullText: `In the Javanese calendar, the month of Suro — the first month of the year, corresponding to the Islamic month of Muharram — is a time of heightened spiritual sensitivity. The barrier between the world of the living and the world of the dead is thinner. Javanese families hold selamatan ceremonies, clean the graves of ancestors, and are cautious about travel and celebration.

This story is told about what happens on the deepest night of Suro.

Pak Widodo was a trader in batik cloth who traveled between cities by night to avoid the daytime heat. On a Suro night — he had forgotten the date, or pretended he had — he was on the road between Surakarta and Yogyakarta when his horse stopped walking.

He looked up. Ahead of him was a market he had never seen before. It was fully lit with oil lamps strung between the stalls. It was crowded with people. The smell of food — soto, grilled corn, bakwan — drifted toward him.

He went in. He was hungry.

The people at the market were normal-looking. They spoke Javanese in the old register — polite, formal, slightly archaic. The food vendors had food that looked right but tasted strange: not bad, exactly, but somehow thinner than normal food, like an impression of food rather than food itself.

He sat at a small stall. The woman serving him looked at him for a long moment and then, without comment, ladled out his soup.

Then he saw his grandmother. She had died three years ago. She was sitting with other elderly women at the edge of the market, talking quietly, her hands in her lap.

He went cold. He said her name.

She looked up. She did not look surprised. She said: "Sit with me for a moment. Don't eat anything else."

He sat. She asked about the family — each person by name. She asked if the middle son had gotten his business in order (he had not). She asked if the youngest granddaughter was studying properly (she was). She said she was glad they still cleaned her grave.

He asked if she was happy.

She said: "Happy and unhappy don't quite apply here. We are just here. It's peaceful. You mustn't be too sad for us."

A sound came — like a gong struck very far away. The market lights flickered.

She said: "You need to go now. The night is changing."

He stood. He looked for the road. When he turned back, his grandmother was gone. The market was fading — not suddenly but like mist clearing, the stalls becoming less solid, the people becoming translucent, the lights going out one by one.

He was on the road. His horse was waiting.

He traveled the rest of the journey in silence. When he reached Yogyakarta, he went to the market district and bought good flowers. He went to his grandmother's grave before anything else.

He told his children the story. They believed it completely.

Javanese families who heard this story added it to the Suro cautionary tales: if you are on the road late in Suro, and you see a market where there was none before — eat nothing (or eat only what comes from the first stall), and look carefully at the faces. Someone you love may be there. Say what you meant to say. Listen to what they want you to know. And leave before the gong sounds.`
  },
  {
    id: "fs051",
    title: "The Boy Who Caught the Wind",
    titleId: "Anak yang Menangkap Angin",
    region: "Nusa Tenggara Barat",
    kingdom: "Sasak",
    category: "fable",
    summary: "A boy from Lombok who is told he will never amount to anything discovers he has the ability to talk to the wind — and uses it to save his drought-stricken island.",
    characters: ["Raden Gede (The Boy)", "The East Wind", "Village Elder", "Mother"],
    moral: "Every person has a gift the world needs — finding it may take time, but it is always there.",
    fullText: `In a village in the eastern hills of Lombok, where the dry season was long and the rains unpredictable, there was a boy named Raden Gede who was considered the most useless child in the village.

He was not bad. He was not cruel. He simply could not do the things that mattered to the village: he was clumsy with tools, had no talent for farming, could not carry heavy loads without dropping them, and was always late because he stopped to watch things — clouds, insects, the way dust moved.

The elder's son mocked him regularly. "What will you ever be good for?"

Raden Gede had no answer. He was seventeen and had no answer.

One day, sitting at the top of the hill where he went to be alone, he felt the wind change direction. He had been watching it for years — the way it shifted with the seasons, how it came different from different directions. He had learned, without intending to, the wind's language: the direction, the temperature, the speed.

He said to the wind, softly, more talking to himself than anything: "You're early this year. The rain usually comes after you, but you're three weeks early."

The wind changed direction slightly. Not speaking — but responding.

Raden Gede froze. Then, carefully, he said: "The fields are dry. Can you... bring the rain early?"

The wind moved around him, different patterns, and he felt — in a way he could not have explained — that it was telling him something. Not yes, not no. But something.

He went down to the village. He told the elder that rain was coming in three days, not three weeks — they should prepare the irrigation channels now, not wait.

The elder laughed at him. But Raden Gede's mother, who loved him with a fierce, quiet love, quietly told her husband to fix the irrigation channel, just in case.

It rained in three days.

After that, Raden Gede was consulted before every planting season. He could tell from the wind when the rains would come, how long the drought would last, when storms approached from the sea. He was never wrong.

He became the village's wind-listener. Not a farmer, not a warrior, not a craftsman — but the person without whom the village could not make its most important decisions.

The elder's son, who had mocked him, eventually came to him before his own wedding: "Is the weather good for travel this month?"

Raden Gede smiled and told him. "It is."

He held no grudge. The wind had taught him patience, among other things.`
  },
  {
    id: "fs052",
    title: "The Silver Tears of Sintang",
    titleId: "Air Mata Perak Sintang",
    region: "West Kalimantan",
    kingdom: "Kutai",
    category: "fairy-tale",
    summary: "A Dayak girl from Sintang whose tears turn to silver discovers that her gift draws both wonder and danger — and must decide what her tears are truly for.",
    characters: ["Niang (The Girl)", "The River Spirit", "Merchant", "Mother"],
    moral: "Gifts are not possessions — they are responsibilities.",
    fullText: `In the town of Sintang in West Kalimantan, where two rivers meet and the forest comes to the water's edge, there was a girl named Niang who had never cried in front of anyone until the day her father's boat did not return.

She wept then, at the riverbank, while her mother wept beside her.

Her mother looked at her in shock. "Niang — your tears—"

Niang touched her face. Her tears were silver. Not metaphorically — they were liquid silver, catching the light, solidifying slightly as they hit her chin, rolling off as tiny beads.

Her mother swept them up quickly. They were worth something. The family, after her father's death, needed everything.

The silver tears kept them alive through the next year. But word spread. A merchant came to buy them. He offered good money. Then more. Then he brought men who said the silver was needed by a powerful lord who would pay very well.

Niang refused. Her mother urged her to think carefully.

The merchant's men surrounded the house.

Niang went to the river that night and sat at the place where the two rivers met. She told the river spirit what was happening — the way her grandmother had taught her to talk to rivers, with simple words, not ceremony.

The river spirit answered in the way river spirits do: not words exactly, but the current changed. The water rose slightly. The light on the surface made a pattern she understood.

The spirit was telling her: what you make of grief is yours. It is not for selling.

Niang went back to her house. She told the merchant and his men: "I am not a silver mine. My tears are not a product. You are welcome to buy what I sell, but I do not sell these."

The men threatened. And then the river — both rivers — rose. Just enough. Just to the doorstep of the house. The merchant's horses panicked in the shallow water.

The men left.

Niang lived simply with her mother. Sometimes she cried. The silver beads were kept in a small clay jar. When the family truly needed something — medicine, a new roof, food in a bad harvest year — they used a few.

The jar never fully emptied. The spirit of the river, Niang believed, kept it filled in small ways — one or two silver beads appearing some mornings, as if left by the current.

She never knew for certain. She chose to believe it was gratitude.`
  },
  {
    id: "fs053",
    title: "The Kingdom Inside the Mountain",
    titleId: "Kerajaan di Dalam Gunung",
    region: "West Java",
    kingdom: "Sunda",
    category: "myth",
    summary: "The Sundanese belief that inside Mount Gede lives a parallel kingdom of the invisible world — accessible only at certain times and to certain people — and the story of a hunter who entered it briefly.",
    characters: ["Haji Amang (Hunter)", "The King of the Inner Mountain", "A Spirit Guide"],
    moral: "The world we see is only one layer of the world that exists.",
    fullText: `Mount Gede in West Java — the ancient volcano that has watched over the Sundanese lands for millions of years — is considered one of the most spiritually significant mountains in Java. The Sundanese people say it contains a kingdom.

Not a metaphorical kingdom. A real one, with a royal court, palaces, ministers, and subjects — all of them invisible to ordinary human eyes, existing in a layer of reality adjacent to ours but not quite the same.

This story is told by elders in the villages on the mountain's western slopes.

Haji Amang was a hunter — a good man, pious, careful. He had hunted on Mount Gede's slopes for thirty years without incident. He always offered a prayer before entering the forest. He always thanked the mountain when he left. He never took more than he needed.

One evening, he was tracking a deer when the light changed. The forest became very quiet — not the silence of danger, but the silence of something else. He looked around. The trees were the same. The path was the same. But the light came from an unusual angle, and he realized he had no idea which way was down.

A small child appeared on the path ahead — neat, clean, not dressed like a mountain child. The child said: "Come with me. The Ratu would like to meet you."

Haji Amang was a pious man and somewhat afraid, but also curious. He followed.

They entered a part of the forest he had never found in thirty years, which should have been impossible. Then through what felt like a wall of mist, and into a space he could not describe clearly afterward except to say: it was indoors and outdoors at the same time. There were halls and gardens simultaneously. There were people — hundreds of them, well-dressed, going about what seemed like ordinary activities in a very extraordinary place.

The Ratu — a tall figure in royal dress — received him briefly. They spoke about the mountain. The Ratu said: "You have respected us for thirty years. We have respected you in return — the deer have always come to you, the storms have always told you to go down before they arrived. I wanted you to know it was not chance."

Haji Amang bowed. He said: "I did not know, but I am grateful."

He was guided back to the path. The forest was ordinary again. He could hear the downhill flow of water and found his way.

He told no one for many years. Then he told his grandson, who became a teacher and told the story in villages.

He died peacefully in his sleep at eighty-four years old, in the house where he had been born.

The Sundanese people who know this story say: respect the mountain, and the mountain respects you. This is not a metaphor. This is the arrangement.`
  },
  {
    id: "fs054",
    title: "Asal Mula Danau Batur — The Bali Caldera",
    titleId: "Asal Mula Danau Batur",
    region: "Bali",
    kingdom: "Bali",
    category: "origin-story",
    summary: "The origin of Lake Batur inside Mount Batur's caldera — a gift from the goddess Dewi Danu who lives within the lake and controls the water flowing to all of Bali's rice fields.",
    characters: ["Dewi Danu (Water Goddess)", "Ida Batara Gunung (Mountain God)", "The First Rice Farmer"],
    moral: "Water is never owned — it is loaned, and the loan must be honored.",
    fullText: `Inside the collapsed caldera of Mount Batur in Bali lives the holiest lake on the island. At the lake's western edge, on the rim of the outer caldera, stands the Pura Ulun Danu Batur — the Mother Temple of the water — where Dewi Danu, the goddess of the lake, receives offerings from farmers throughout Bali.

This is the story of how she came to be there.

In the time when Bali was still being formed, the great volcano that would become Mount Batur erupted repeatedly, shaping the central highlands. The mountain god, Ida Batara Gunung, watched over the peak. But the central crater was empty and dry — useful to no one.

Dewi Danu came from the realm of the heavens, drawn by the beauty of the island below and the sight of the farmers struggling in their terraced fields during dry season. She saw how the rice needed water at regular intervals, how the farmers watched the sky and prayed but had no reliable source.

She went to the mountain god: "Let me fill the crater."

He was uncertain — a lake in a volcano was unusual. But Dewi Danu was patient and persuasive, and eventually he agreed.

She filled the caldera with a fresh spring that welled up from the center of the earth. The lake Batur formed — blue-green, cold, fed from below by volcanic springs that never ran dry.

But she did not just create the lake and leave. She made a covenant with the island.

She built pathways beneath the earth — invisible channels through the volcanic rock — along which the lake's water could move downward to the fields. The water table of Bali's central highlands is fed by Lake Batur. Every spring, every river that waters the rice terraces of Bali is ultimately connected to the lake she made.

The farmers of Bali understand this. The subak system — the traditional Balinese irrigation organization, recognized by UNESCO as a Cultural Landscape — is centered on the relationship between the temples and the water. The high priest of Pura Ulun Danu Batur coordinates the irrigation schedules for farmers across the island. They do not go to engineers — they go to the goddess.

Dewi Danu's covenant is simple: I will keep the water flowing. You will honor me, care for the water you receive, and pass it on justly to the next field and the next farmer. Water is not yours to hoard. It comes from the goddess and must flow.

The ancient Balinese irrigation system, built on this covenant, is one of the most sophisticated and ecologically sustainable agricultural systems ever developed. It has fed Bali for at least a thousand years.

The lake is still full. The springs below it are still flowing. Dewi Danu is still there, in the cold blue water inside the caldera of the mountain.`
  },
  {
    id: "fs055",
    title: "The Last Dalang of Majapahit",
    titleId: "Dalang Terakhir Majapahit",
    region: "East Java",
    kingdom: "Majapahit",
    category: "legend",
    summary: "As the Majapahit Empire falls to Islamic kingdoms, the last royal court dalang carries the entire wayang tradition — all its stories, characters, and music — into exile, preserving it for future generations.",
    characters: ["Empu Panuluh (The Last Dalang)", "The Young Apprentice", "The Last Prince of Majapahit"],
    moral: "Culture survives conquest when people love it enough to carry it with them.",
    fullText: `In the last years of the Majapahit Empire — the 1520s, as Islamic kingdoms expanded from the coast inward — the great court at Trowulan was emptying. Nobles fled eastward, to Bali, which would become the final refuge of Majapahit's Hindu-Buddhist culture. They took with them what they could carry: manuscripts, sacred objects, knowledge.

The court's dalang, Empu Panuluh, was very old. He had spent sixty years as the keeper of the wayang tradition — every shadow puppet performance, every story from the Ramayana and Mahabharata and the Panji cycle, every musical score, every puppetry technique was stored in his memory and his hands.

He could not leave quickly. He had to teach.

He had one apprentice — a boy of fifteen named Karang — who had showed exceptional promise. But fifteen years is not enough to learn what Empu Panuluh knew.

The old dalang began, in those last months at Trowulan, the most intensive teaching of his life. He stayed awake for nights at a time, not performing the stories but dictating them — every word, every character, every movement, to Karang who carved it all into lontar palm leaves with shaking hands.

He taught the music: the gong patterns, the drum rhythms, the intervals for different emotional moments. He taught the puppetry: how to hold each puppet for each type of character, how the left hand moved differently from the right, how the shadow's silhouette could be shifted slightly to change the emotional tone.

He taught the audience: what they needed to feel, and how to give it to them.

When the soldiers of the coastal kingdoms came too close, Empu Panuluh sent Karang east with the lontar manuscripts. "Go to Bali," he said. "Everything I know is in those leaves and in your hands. Don't let them die."

He stayed behind. He had nowhere else to be. He had been the court's dalang since he was twenty — Trowulan was his home.

The old man performed one last wayang that night, alone in the empty court, with no audience. He performed the story of Arjuna in the wilderness — the great archer alone on a mountain, stripped of his weapons, learning what strength really is.

Karang reached Bali. He taught the tradition there, and it grew into the extraordinarily rich Balinese wayang that exists today — where the Hindu stories of Majapahit were preserved and deepened, where the dalang is still considered the most important artist in a village, where performances still last all night.

The wayang of Bali is, in a way, the memory of Majapahit. It carries the last court in its rhythms and its stories. Empu Panuluh's desperate gift to his apprentice is still being unwrapped, five hundred years later, in the firelight of Balinese performances.

Culture does not die when a kingdom falls. It dies only when no one loves it enough to carry it.`
  },
];

export const STORY_CATEGORIES = ['legend', 'fable', 'myth', 'fairy-tale', 'origin-story'] as const;
export type StoryCategory = typeof STORY_CATEGORIES[number];

export const STORY_REGIONS = [
  'All Regions', 'Java', 'Sumatra', 'Bali', 'Kalimantan', 'Sulawesi', 'Papua', 'Nusa Tenggara', 'Maluku'
] as const;

export const CATEGORY_LABELS: Record<StoryCategory, string> = {
  'legend': 'Legend',
  'fable': 'Fable',
  'myth': 'Myth',
  'fairy-tale': 'Fairy Tale',
  'origin-story': 'Origin Story',
};

export const CATEGORY_COLORS: Record<StoryCategory, string> = {
  'legend': '#C4622D',
  'fable': '#2D5A3D',
  'myth': '#4A3020',
  'fairy-tale': '#D4A843',
  'origin-story': '#8B4513',
};
