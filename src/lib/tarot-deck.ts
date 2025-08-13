
export interface TarotCard {
    name: string;
    meaning_upright: string;
    meaning_reversed: string;
    imageKeywords: string;
    image: string;
}

export const customTarotDeck: TarotCard[] = [
    // Major Arcana
    {
        name: "The Fool",
        meaning_upright: "Embarking on a new journey with faith and optimism. A leap of faith is required, but the universe supports you. Trust in the unknown and embrace the possibilities.",
        meaning_reversed: "Hesitation, fear of the unknown, and missed opportunities. You are holding yourself back with self-doubt. Re-evaluate your path before proceeding.",
        imageKeywords: "tarot fool",
        image: "/tarot/the-fool.png"
    },
    {
        name: "The Magician",
        meaning_upright: "Manifestation, willpower, and resourcefulness. You have all the tools you need to succeed. It's time to take action and turn your dreams into reality.",
        meaning_reversed: "Manipulation, poor planning, and untapped talents. You are not using your power effectively. Be wary of trickery or deceit.",
        imageKeywords: "tarot magician",
        image: "/tarot/the-magician.png"
    },
    {
        name: "The High Priestess",
        meaning_upright: "Tapping into intuition and hidden knowledge. Secrets are being revealed. Trust your inner voice and look beyond the obvious. A time for introspection.",
        meaning_reversed: "Confusion, secrets, and a disconnect from your intuition. You are ignoring your inner guidance. Be wary of deception from others or from yourself.",
        imageKeywords: "tarot high priestess",
        image: "/tarot/the-high-priestess.png"
    },
    {
        name: "The Empress",
        meaning_upright: "Nurturing, abundance, and creativity. A time of growth and fertility in all aspects of life. Embrace your sensual and creative side. Motherhood and connection to nature.",
        meaning_reversed: "Creative blocks, dependence on others, and stagnation. You may be neglecting your own needs or feeling smothered. A need for self-love and independence.",
        imageKeywords: "tarot empress",
        image: "/tarot/the-empress.png"
    },
    {
        name: "The Emperor",
        meaning_upright: "Authority, structure, and control. A time to be disciplined and establish order. You are in a position of power and responsibility. Father figure.",
        meaning_reversed: "Domination, excessive control, and rigidity. You are being too forceful or inflexible. A lack of self-control is causing chaos.",
        imageKeywords: "tarot emperor",
        image: "/tarot/the-emperor.png"
    },
    {
        name: "The Hierophant",
        meaning_upright: "Tradition, spiritual wisdom, and institutions. Seeking guidance from established beliefs or a mentor. A time for learning and spiritual practice.",
        meaning_reversed: "Rebellion, challenging traditions, and unconventional beliefs. You are breaking free from norms and finding your own path. A need for personal freedom.",
        imageKeywords: "tarot hierophant",
        image: "/tarot/the-hierophant.png"
    },
    {
        name: "The Lovers",
        meaning_upright: "Love, harmony, and partnerships. A significant relationship or choice is at hand. Align your values and make decisions from the heart. Union.",
        meaning_reversed: "Disharmony, misalignment of values, and conflict. A relationship may be struggling or a choice may lead to imbalance. Re-evaluate your connections.",
        imageKeywords: "tarot lovers",
        image: "/tarot/the-lovers.png"
    },
    {
        name: "The Chariot",
        meaning_upright: "Determination, victory, and self-control. You are moving forward with focus and ambition. Overcoming obstacles through willpower. A journey.",
        meaning_reversed: "Lack of direction, aggression, and loss of control. You are scattered and forceful. A need to rein in your energy and find focus.",
        imageKeywords: "tarot chariot",
        image: "/tarot/the-chariot.png"
    },
    {
        name: "Strength",
        meaning_upright: "Courage, compassion, and inner power. You have the strength to overcome challenges with grace. Taming the beast within. Self-mastery.",
        meaning_reversed: "Self-doubt, weakness, and lack of self-control. You are letting your fears and instincts control you. A need to find your inner courage.",
        imageKeywords: "tarot strength",
        image: "/tarot/strength.png"
    },
    {
        name: "The Hermit",
        meaning_upright: "Introspection, soul-searching, and inner guidance. A time for solitude and reflection. Seeking wisdom from within. A spiritual journey.",
        meaning_reversed: "Isolation, loneliness, and withdrawal. You are cutting yourself off from others. A need to reconnect with the world.",
        imageKeywords: "tarot hermit",
        image: "/tarot/the-hermit.png"
    },
    {
        name: "Wheel of Fortune",
        meaning_upright: "Change, cycles, and good fortune. A turning point is here. The universe is shifting in your favor. Destiny is at play. Luck.",
        meaning_reversed: "Bad luck, resistance to change, and unexpected setbacks. The cycle is turning against you. A need to adapt and accept the inevitable.",
        imageKeywords: "tarot wheel fortune",
        image: "/tarot/wheel-of-fortune.png"
    },
    {
        name: "Justice",
        meaning_upright: "Fairness, truth, and cause and effect. Your actions have consequences. A time for balanced decisions and honesty. Legal matters.",
        meaning_reversed: "Injustice, dishonesty, and unaccountability. You are avoiding the truth or facing unfairness. A need to take responsibility for your actions.",
        imageKeywords: "tarot justice",
        image: "/tarot/justice.png"
    },
    {
        name: "The Hanged Man",
        meaning_upright: "New perspectives, surrender, and letting go. A time to pause and see things differently. Sacrifice is needed for growth. A spiritual awakening.",
        meaning_reversed: "Stagnation, resistance, and martyrdom. You are stuck in a rut and unwilling to change. A need to release control and accept what is.",
        imageKeywords: "tarot hanged man",
        image: "/tarot/the-hanged-man.png"
    },
    {
        name: "Death",
        meaning_upright: "Endings, transformation, and new beginnings. A major change is here. Letting go of the old to make way for the new. A rebirth.",
        meaning_reversed: "Resistance to change, fear of endings, and stagnation. You are clinging to the past. A need to embrace change and move on.",
        imageKeywords: "tarot death",
        image: "/tarot/death.png"
    },
    {
        name: "Temperance",
        meaning_upright: "Balance, patience, and moderation. A time for harmony and finding the middle ground. Blending different aspects of your life. Healing.",
        meaning_reversed: "Imbalance, excess, and lack of patience. You are going to extremes. A need for moderation and self-control.",
        imageKeywords: "tarot temperance",
        image: "/tarot/temperance.png"
    },
    {
        name: "The Devil",
        meaning_upright: "Addiction, materialism, and bondage. You are trapped by your desires or negative patterns. A time to face your shadow and break free.",
        meaning_reversed: "Breaking free, release, and detachment. You are overcoming your addictions and negative patterns. A time for liberation.",
        imageKeywords: "tarot devil",
        image: "/tarot/the-devil.png"
    },
    {
        name: "The Tower",
        meaning_upright: "Sudden upheaval, chaos, and revelation. A sudden change is here to break down old structures. A necessary destruction for growth.",
        meaning_reversed: "Avoiding disaster, fear of change, and clinging to old ways. You are resisting a necessary change. The longer you wait, the harder it will be.",
        imageKeywords: "tarot tower",
        image: "/tarot/the-tower.png"
    },
    {
        name: "The Star",
        meaning_upright: "Hope, inspiration, and spiritual guidance. You are on the right path and are being guided by the universe. A time for healing and believing in your dreams.",
        meaning_reversed: "Despair, lack of faith, and feeling lost. You have lost sight of your guiding star. Reconnect with your spiritual purpose and find hope again.",
        imageKeywords: "tarot star",
        image: "/tarot/the-star.png"
    },
    {
        name: "The Moon",
        meaning_upright: "Illusion, intuition, and the subconscious. Things are not as they seem. Trust your intuition to guide you through uncertainty. Dreams and fears.",
        meaning_reversed: "Clarity, release of fear, and understanding. You are seeing through illusions and finding the truth. A time of emotional clarity.",
        imageKeywords: "tarot moon",
        image: "/tarot/the-moon.png"
    },
    {
        name: "The Sun",
        meaning_upright: "Joy, success, and positivity. The sun is shining on you, bringing clarity and vitality. A time of celebration and accomplishment. Your true self is illuminated.",
        meaning_reversed: "Lack of enthusiasm, pessimism, and clouded judgment. You are struggling to see the bright side. Temporary setbacks may be obscuring the truth.",
        imageKeywords: "tarot sun",
        image: "/tarot/the-sun.png"
    },
    {
        name: "Judgement",
        meaning_upright: "Rebirth, inner calling, and absolution. A time of reckoning and forgiveness. You are ready to rise up and embrace your true self. A spiritual awakening.",
        meaning_reversed: "Self-doubt, ignoring the call, and self-loathing. You are judging yourself too harshly and resisting your own transformation. A need for self-forgiveness.",
        imageKeywords: "tarot judgement",
        image: "/tarot/judgement.png"
    },
    {
        name: "The World",
        meaning_upright: "Completion, integration, and accomplishment. A cycle is ending and you have achieved your goal. A time of celebration and fulfillment. Wholeness.",
        meaning_reversed: "Incompletion, lack of closure, and stagnation. You are feeling stuck and unable to move on. A need to tie up loose ends.",
        imageKeywords: "tarot world",
        image: "/tarot/the-world.png"
    },

    // Suit of Wands
    {
        name: "Ace of Wands",
        meaning_upright: "New ideas, inspiration, and potential. A new creative project or passion is beginning. Seize the opportunity and take action.",
        meaning_reversed: "Lack of motivation, delays, and missed opportunities. You are feeling uninspired and stuck. A need to find your passion.",
        imageKeywords: "ace wands",
        image: "/tarot/ace-of-wands.png"
    },
    {
        name: "Two of Wands",
        meaning_upright: "Planning, future decisions, and progress. You are at a crossroads and need to make a choice. A time to plan for the future.",
        meaning_reversed: "Fear of the unknown, lack of planning, and indecision. You are afraid to move forward. A need to make a choice and commit.",
        imageKeywords: "two wands",
        image: "/tarot/two-of-wands.png"
    },
    {
        name: "Three of Wands",
        meaning_upright: "Expansion, foresight, and looking ahead. Your plans are in motion and you are seeing progress. A time to be patient and wait for results.",
        meaning_reversed: "Delays, obstacles, and lack of foresight. Your plans are not working out as expected. A need to re-evaluate your strategy.",
        imageKeywords: "three wands",
        image: "/tarot/three-of-wands.png"
    },
    {
        name: "Four of Wands",
        meaning_upright: "Celebration, harmony, and community. A time of joy and celebration with loved ones. A happy home life and sense of belonging.",
        meaning_reversed: "Lack of harmony, instability, and feeling unwelcome. There is conflict in your home or community. A need to find your place.",
        imageKeywords: "four wands",
        image: "/tarot/four-of-wands.png"
    },
    {
        name: "Five of Wands",
        meaning_upright: "Competition, conflict, and disagreements. You are facing challenges from others. A need to stand your ground and fight for what you believe in.",
        meaning_reversed: "Avoiding conflict, giving up, and inner turmoil. You are avoiding a necessary confrontation. A need to find common ground.",
        imageKeywords: "five wands",
        image: "/tarot/five-of-wands.png"
    },
    {
        name: "Six of Wands",
        meaning_upright: "Victory, success, and public recognition. You have achieved your goals and are being celebrated. A time of confidence and accomplishment.",
        meaning_reversed: "Lack of recognition, failure, and self-doubt. Your achievements have gone unnoticed. A need to believe in yourself.",
        imageKeywords: "six wands",
        image: "/tarot/six-of-wands.png"
    },
    {
        name: "Seven of Wands",
        meaning_upright: "Challenge, perseverance, and standing your ground. You are facing opposition but have the advantage. A need to be courageous and persistent.",
        meaning_reversed: "Giving up, feeling overwhelmed, and being on the defensive. You are losing ground and feeling defeated. A need to regroup.",
        imageKeywords: "seven wands",
        image: "/tarot/seven-of-wands.png"
    },
    {
        name: "Eight of Wands",
        meaning_upright: "Speed, action, and rapid change. Things are moving quickly. A time for swift decisions and embracing change. Travel.",
        meaning_reversed: "Delays, frustration, and resisting change. Things are slowing down and you are feeling stuck. A need to be patient.",
        imageKeywords: "eight wands",
        image: "/tarot/eight-of-wands.png"
    },
    {
        name: "Nine of Wands",
        meaning_upright: "Resilience, courage, and persistence. You are nearing the end of a battle. A final push is needed. Don't give up now.",
        meaning_reversed: "Fatigue, paranoia, and giving up. You are tired of fighting and feel defensive. A need to find strength and keep going.",
        imageKeywords: "nine wands",
        image: "/tarot/nine-of-wands.png"
    },
    {
        name: "Ten of Wands",
        meaning_upright: "Burden, responsibility, and hard work. You are carrying a heavy load. A need to delegate or release some of your burdens.",
        meaning_reversed: "Letting go, release, and avoiding responsibility. You are freeing yourself from a heavy load. A need to delegate or say no.",
        imageKeywords: "ten wands",
        image: "/tarot/ten-of-wands.png"
    },
    {
        name: "Page of Wands",
        meaning_upright: "Enthusiasm, exploration, and new ideas. You are full of creative energy and ready to explore new possibilities. A messenger of good news.",
        meaning_reversed: "Lack of direction, procrastination, and uninspired ideas. You are feeling stuck and unmotivated. A need to find a new spark.",
        imageKeywords: "page wands",
        image: "/tarot/page-of-wands.png"
    },
    {
        name: "Knight of Wands",
        meaning_upright: "Energy, passion, and adventure. You are charging ahead with confidence and enthusiasm. A time for action and taking risks.",
        meaning_reversed: "Impulsiveness, haste, and recklessness. You are acting without thinking. A need to slow down and consider the consequences.",
        imageKeywords: "knight wands",
        image: "/tarot/knight-of-wands.png"
    },
    {
        name: "Queen of Wands",
        meaning_upright: "Confidence, courage, and independence. You are a natural leader who inspires others. A time to be bold and embrace your power.",
        meaning_reversed: "Insecurity, jealousy, and demandingness. You are feeling insecure and controlling. A need to find your inner confidence.",
        imageKeywords: "queen wands",
        image: "/tarot/queen-of-wands.png"
    },
    {
        name: "King of Wands",
        meaning_upright: "Leadership, vision, and inspiration. You are a powerful and charismatic leader. A time to take charge and inspire others.",
        meaning_reversed: "Arrogance, impulsiveness, and ruthlessness. You are being too forceful and demanding. A need to be more compassionate.",
        imageKeywords: "king wands",
        image: "/tarot/king-of-wands.png"
    },
    
    // Suit of Cups
    {
        name: "Ace of Cups",
        meaning_upright: "New love, emotional beginnings, and creativity. A new relationship or creative project is starting. Open your heart to new possibilities.",
        meaning_reversed: "Blocked emotions, repressed feelings, and creative stagnation. You are closing yourself off from love. A need to express your feelings.",
        imageKeywords: "ace cups",
        image: "/tarot/ace-of-cups.png"
    },
    {
        name: "Two of Cups",
        meaning_upright: "Partnership, mutual attraction, and shared feelings. A deep connection with another person. A time for harmony and understanding.",
        meaning_reversed: "Break-ups, disharmony, and mistrust. A relationship is struggling. A need to communicate and find common ground.",
        imageKeywords: "two cups",
        image: "/tarot/two-of-cups.png"
    },
    {
        name: "Three of Cups",
        meaning_upright: "Celebration, friendship, and community. A time of joy and celebration with friends. A happy social life and sense of belonging.",
        meaning_reversed: "Gossip, overindulgence, and isolation. There is conflict in your social circle. A need to be mindful of your actions.",
        imageKeywords: "three cups",
        image: "/tarot/three-of-cups.png"
    },
    {
        name: "Four of Cups",
        meaning_upright: "Apathy, contemplation, and missed opportunities. You are feeling bored and disconnected. A new opportunity is being offered, but you are not seeing it.",
        meaning_reversed: "Sudden awareness, choosing happiness, and seizing opportunities. You are waking up to new possibilities. A time to be grateful.",
        imageKeywords: "four cups",
        image: "/tarot/four-of-cups.png"
    },
    {
        name: "Five of Cups",
        meaning_upright: "Loss, regret, and disappointment. You are focusing on what you have lost. A need to see the positive and move on.",
        meaning_reversed: "Acceptance, forgiveness, and moving on. You are letting go of past regrets. A time for healing and new beginnings.",
        imageKeywords: "five cups",
        image: "/tarot/five-of-cups.png"
    },
    {
        name: "Six of Cups",
        meaning_upright: "Nostalgia, childhood memories, and innocence. A happy reunion with someone from your past. A time for simple joys and kindness.",
        meaning_reversed: "Stuck in the past, naivety, and unrealistic expectations. You are clinging to the past. A need to grow up and face reality.",
        imageKeywords: "six cups",
        image: "/tarot/six-of-cups.png"
    },
    {
        name: "Seven of Cups",
        meaning_upright: "Choices, illusions, and wishful thinking. You have many options, but not all are what they seem. A need to be realistic and make a clear choice.",
        meaning_reversed: "Clarity, determination, and making a choice. You are seeing through illusions and making a decision. A time to be focused.",
        imageKeywords: "seven cups",
        image: "/tarot/seven-of-cups.png"
    },
    {
        name: "Eight of Cups",
        meaning_upright: "Walking away, disappointment, and moving on. You are leaving a situation that is no longer fulfilling. A time for soul-searching.",
        meaning_reversed: "Stagnation, fear of the unknown, and clinging to the past. You are afraid to move on. A need to let go and find your path.",
        imageKeywords: "eight cups",
        image: "/tarot/eight-of-cups.png"
    },
    {
        name: "Nine of Cups",
        meaning_upright: "Wishes fulfilled, contentment, and satisfaction. You have what you want and are feeling happy. A time to enjoy your achievements.",
        meaning_reversed: "Unmet desires, materialism, and dissatisfaction. You are not getting what you want. A need to be grateful for what you have.",
        imageKeywords: "nine cups",
        image: "/tarot/nine-of-cups.png"
    },
    {
        name: "Ten of Cups",
        meaning_upright: "Happy family, emotional fulfillment, and harmony. You have a loving and supportive family. A time of joy and contentment.",
        meaning_reversed: "Family conflict, broken homes, and disharmony. There is trouble in your family life. A need to find peace and understanding.",
        imageKeywords: "ten cups",
        image: "/tarot/ten-of-cups.png"
    },
    {
        name: "Page of Cups",
        meaning_upright: "Creative opportunities, intuition, and emotional messages. You are receiving a message of love or creativity. A time to trust your heart.",
        meaning_reversed: "Emotional immaturity, creative blocks, and insecurity. You are not trusting your feelings. A need to be more open.",
        imageKeywords: "page cups",
        image: "/tarot/page-of-cups.png"
    },
    {
        name: "Knight of Cups",
        meaning_upright: "Romance, charm, and imagination. A romantic offer or creative proposal is coming your way. A time for love and dreams.",
        meaning_reversed: "Unrealistic dreams, moodiness, and disappointment. You are being overly emotional. A need to be more grounded in reality.",
        imageKeywords: "knight cups",
        image: "/tarot/knight-of-cups.png"
    },
    {
        name: "Queen of Cups",
        meaning_upright: "Compassion, intuition, and emotional security. You are emotionally balanced and supportive of others. A time for healing and kindness.",
        meaning_reversed: "Emotional insecurity, neediness, and martyrdom. You are being too emotional and dependent. A need to find your inner strength.",
        imageKeywords: "queen cups",
        image: "/tarot/queen-of-cups.png"
    },
    {
        name: "King of Cups",
        meaning_upright: "Emotional balance, compassion, and diplomacy. You are in control of your emotions and a master of your feelings. A time for wise counsel.",
        meaning_reversed: "Emotional manipulation, moodiness, and volatility. You are using your emotions to control others. A need to be more honest.",
        imageKeywords: "king cups",
        image: "/tarot/king-of-cups.png"
    },

    // Suit of Swords
    {
        name: "Ace of Swords",
        meaning_upright: "Breakthrough, clarity, and new ideas. A moment of truth and mental clarity. A time to cut through confusion and make a decision.",
        meaning_reversed: "Confusion, lack of clarity, and poor judgment. You are not seeing things clearly. A need to get more information before acting.",
        imageKeywords: "ace swords",
        image: "/tarot/ace-of-swords.png"
    },
    {
        name: "Two of Swords",
        meaning_upright: "Stalemate, difficult choices, and indecision. You are avoiding a difficult decision. A need to face the truth and make a choice.",
        meaning_reversed: "Indecision, confusion, and information overload. You are overwhelmed with choices. A need to trust your intuition.",
        imageKeywords: "two swords",
        image: "/tarot/two-of-swords.png"
    },
    {
        name: "Three of Swords",
        meaning_upright: "Heartbreak, sorrow, and painful truth. A painful realization or separation. A time for grieving and healing.",
        meaning_reversed: "Releasing pain, forgiveness, and recovery. You are healing from a painful experience. A time for letting go.",
        imageKeywords: "three swords",
        image: "/tarot/three-of-swords.png"
    },
    {
        name: "Four of Swords",
        meaning_upright: "Rest, recuperation, and contemplation. A time for rest and recovery after a difficult time. A need for peace and quiet.",
        meaning_reversed: "Restlessness, burnout, and stagnation. You are not taking the time you need to recover. A need for a break.",
        imageKeywords: "four swords",
        image: "/tarot/four-of-swords.png"
    },
    {
        name: "Five of Swords",
        meaning_upright: "Conflict, defeat, and winning at all costs. A situation where there are no real winners. A need to choose your battles wisely.",
        meaning_reversed: "Reconciliation, making amends, and moving on. You are ready to forgive and forget. A time for peace.",
        imageKeywords: "five swords",
        image: "/tarot/five-of-swords.png"
    },
    {
        name: "Six of Swords",
        meaning_upright: "Transition, moving on, and leaving trouble behind. You are moving towards a better future. A time for healing and recovery.",
        meaning_reversed: "Stuck in the past, emotional baggage, and resistance to change. You are unable to move on. A need to let go of the past.",
        imageKeywords: "six swords",
        image: "/tarot/six-of-swords.png"
    },
    {
        name: "Seven of Swords",
        meaning_upright: "Deception, betrayal, and sneakiness. Someone is being dishonest. A need to be cautious and protect yourself.",
        meaning_reversed: "Confession, conscience, and returning to the fold. The truth is coming out. A time for honesty and integrity.",
        imageKeywords: "seven swords",
        image: "/tarot/seven-of-swords.png"
    },
    {
        name: "Eight of Swords",
        meaning_upright: "Feeling trapped, victim mentality, and self-imposed restrictions. You feel powerless to change your situation. A need to see that you have options.",
        meaning_reversed: "Breaking free, release, and taking control. You are finding your power and freeing yourself. A time for empowerment.",
        imageKeywords: "eight swords",
        image: "/tarot/eight-of-swords.png"
    },
    {
        name: "Nine of Swords",
        meaning_upright: "Anxiety, worry, and fear. You are trapped in a cycle of negative thinking. A need to face your fears and seek help.",
        meaning_reversed: "Release of worry, finding hope, and recovery. You are overcoming your fears. A time for peace of mind.",
        imageKeywords: "nine swords",
        image: "/tarot/nine-of-swords.png"
    },
    {
        name: "Ten of Swords",
        meaning_upright: "Painful endings, betrayal, and rock bottom. A difficult situation has come to an end. A time for release and new beginnings.",
        meaning_reversed: "Recovery, regeneration, and resisting the inevitable. You are slowly recovering from a painful ending. A time for hope.",
        imageKeywords: "ten swords",
        image: "/tarot/ten-of-swords.png"
    },
    {
        name: "Page of Swords",
        meaning_upright: "Curiosity, new ideas, and mental agility. You are eager to learn and explore new ideas. A messenger of new information.",
        meaning_reversed: "Gossip, scattered thoughts, and all-talk-no-action. You are full of ideas but lack focus. A need to be more disciplined.",
        imageKeywords: "page swords",
        image: "/tarot/page-of-swords.png"
    },
    {
        name: "Knight of Swords",
        meaning_upright: "Ambitious, fast-thinking, and action-oriented. You are charging ahead with focus and determination. A time for decisive action.",
        meaning_reversed: "Reckless, impulsive, and arrogant. You are acting without thinking. A need to slow down and be more strategic.",
        imageKeywords: "knight swords",
        image: "/tarot/knight-of-swords.png"
    },
    {
        name: "Queen of Swords",
        meaning_upright: "Independent, clear-minded, and honest. You are a sharp thinker who values truth and fairness. A time to be direct and impartial.",
        meaning_reversed: "Cold, bitter, and overly critical. You are being too harsh and judgmental. A need to be more compassionate.",
        imageKeywords: "queen swords",
        image: "/tarot/queen-of-swords.png"
    },
    {
        name: "King of Swords",
        meaning_upright: "Intellectual, authoritative, and analytical. You are a powerful thinker who values logic and truth. A time for clear judgment.",
        meaning_reversed: "Manipulative, tyrannical, and abusive. You are using your intellect to control others. A need to be more ethical.",
        imageKeywords: "king swords",
        image: "/tarot/king-of-swords.png"
    },
    
    // Suit of Pentacles
    {
        name: "Ace of Pentacles",
        meaning_upright: "New opportunity, manifestation, and prosperity. A new financial or career opportunity is here. A time to plant the seeds for future success.",
        meaning_reversed: "Missed opportunity, poor planning, and lack of foresight. You have missed out on a chance for growth. A need to be more practical.",
        imageKeywords: "ace pentacles",
        image: "/tarot/ace-of-pentacles.png"
    },
    {
        name: "Two of Pentacles",
        meaning_upright: "Balancing priorities, adaptability, and time management. You are juggling multiple responsibilities. A need to be flexible and adaptable.",
        meaning_reversed: "Imbalance, disorganization, and over-commitment. You are struggling to keep up with your responsibilities. A need to prioritize.",
        imageKeywords: "two pentacles",
        image: "/tarot/two-of-pentacles.png"
    },
    {
        name: "Three of Pentacles",
        meaning_upright: "Teamwork, collaboration, and skill. You are working with others to achieve a common goal. A time to be a team player.",
        meaning_reversed: "Lack of teamwork, poor quality work, and conflict. There is discord in your team. A need to work together more effectively.",
        imageKeywords: "three pentacles",
        image: "/tarot/three-of-pentacles.png"
    },
    {
        name: "Four of Pentacles",
        meaning_upright: "Saving, security, and conservation. You are holding on to your resources. A need to be careful with your money.",
        meaning_reversed: "Greed, materialism, and possessiveness. You are being too attached to your possessions. A need to be more generous.",
        imageKeywords: "four pentacles",
        image: "/tarot/four-of-pentacles.png"
    },
    {
        name: "Five of Pentacles",
        meaning_upright: "Financial loss, poverty, and isolation. You are going through a difficult time financially. A need to seek help and support.",
        meaning_reversed: "Recovery, finding help, and positive change. You are starting to recover from a financial loss. A time for hope.",
        imageKeywords: "five pentacles",
        image: "/tarot/five-of-pentacles.png"
    },
    {
        name: "Six of Pentacles",
        meaning_upright: "Generosity, charity, and giving and receiving. A time of financial balance and sharing your wealth. A need to be charitable.",
        meaning_reversed: "Debt, selfishness, and one-sided giving. There is an imbalance in giving and receiving. A need to be more fair.",
        imageKeywords: "six pentacles",
        image: "/tarot/six-of-pentacles.png"
    },
    {
        name: "Seven of Pentacles",
        meaning_upright: "Patience, investment, and long-term vision. You are waiting for your hard work to pay off. A time to be patient and persistent.",
        meaning_reversed: "Lack of long-term vision, impatience, and wasted effort. You are not seeing results from your work. A need to re-evaluate your strategy.",
        imageKeywords: "seven pentacles",
        image: "/tarot/seven-of-pentacles.png"
    },
    {
        name: "Eight of Pentacles",
        meaning_upright: "Hard work, skill development, and craftsmanship. You are honing your skills and mastering your craft. A time for dedication.",
        meaning_reversed: "Perfectionism, lack of ambition, and repetitive work. You are stuck in a rut. A need to find a new challenge.",
        imageKeywords: "eight pentacles",
        image: "/tarot/eight-of-pentacles.png"
    },
    {
        name: "Nine of Pentacles",
        meaning_upright: "Abundance, luxury, and self-sufficiency. You are enjoying the fruits of your labor. A time of financial independence and security.",
        meaning_reversed: "Financial dependence, over-spending, and superficiality. You are living beyond your means. A need to be more responsible.",
        imageKeywords: "nine pentacles",
        image: "/tarot/nine-of-pentacles.png"
    },
    {
        name: "Ten of Pentacles",
        meaning_upright: "Wealth, legacy, and family inheritance. You have created a lasting legacy. A time of financial security and family support.",
        meaning_reversed: "Financial failure, family disputes, and loss. There is trouble with your family's finances. A need to be more careful.",
        imageKeywords: "ten pentacles",
        image: "/tarot/ten-of-pentacles.png"
    },
    {
        name: "Page of Pentacles",
        meaning_upright: "New opportunities, financial beginnings, and manifestation. A new opportunity for financial growth is here. A time to be practical and diligent.",
        meaning_reversed: "Lack of progress, procrastination, and missed opportunities. You are not making the most of your opportunities. A need to be more focused.",
        imageKeywords: "page pentacles",
        image: "/tarot/page-of-pentacles.png"
    },
    {
        name: "Knight of Pentacles",
        meaning_upright: "Hard work, responsibility, and routine. You are working diligently towards your goals. A time to be patient and methodical.",
        meaning_reversed: "Boredom, stagnation, and laziness. You are stuck in a rut. A need to find a new challenge and be more ambitious.",
        imageKeywords: "knight pentacles",
        image: "/tarot/knight-of-pentacles.png"
    },
    {
        name: "Queen of Pentacles",
        meaning_upright: "Nurturing, practical, and down-to-earth. You are a caring and resourceful person. A time to be generous and create a comfortable home.",
        meaning_reversed: "Financial insecurity, self-centeredness, and smothering. You are being too materialistic or possessive. A need to be more charitable.",
        imageKeywords: "queen pentacles",
        image: "/tarot/queen-of-pentacles.png"
    },
    {
        name: "King of Pentacles",
        meaning_upright: "Wealth, success, and leadership. You are a successful and influential leader. A time of financial abundance and security.",
        meaning_reversed: "Greed, materialism, and stubbornness. You are being too focused on money and possessions. A need to be more generous.",
        imageKeywords: "king pentacles",
        image: "/tarot/king-of-pentacles.png"
    }
];
