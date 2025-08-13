
export interface TarotCard {
    name: string;
    meaning_upright: string;
    meaning_reversed: string;
    imageKeywords: string;
}

export const customTarotDeck: TarotCard[] = [
    {
        name: "The Dreamer's Path",
        meaning_upright: "Embarking on a new journey with faith and optimism. A leap of faith is required, but the universe supports you. Trust in the unknown and embrace the possibilities.",
        meaning_reversed: "Hesitation, fear of the unknown, and missed opportunities. You are holding yourself back with self-doubt. Re-evaluate your path before proceeding.",
        imageKeywords: "tarot fool"
    },
    {
        name: "The Mystic's Gate",
        meaning_upright: "Tapping into intuition and hidden knowledge. Secrets are being revealed. Trust your inner voice and look beyond the obvious. A time for introspection.",
        meaning_reversed: "Confusion, secrets, and a disconnect from your intuition. You are ignoring your inner guidance. Be wary of deception from others or from yourself.",
        imageKeywords: "tarot high priestess"
    },
    {
        name: "The Gilded Empress",
        meaning_upright: "Nurturing, abundance, and creativity. A time of growth and fertility in all aspects of life. Embrace your sensual and creative side. Motherhood and connection to nature.",
        meaning_reversed: "Creative blocks, dependence on others, and stagnation. You may be neglecting your own needs or feeling smothered. A need for self-love and independence.",
        imageKeywords: "tarot empress"
    },
    {
        name: "The Sunstone",
        meaning_upright: "Joy, success, and positivity. The sun is shining on you, bringing clarity and vitality. A time of celebration and accomplishment. Your true self is illuminated.",
        meaning_reversed: "Lack of enthusiasm, pessimism, and clouded judgment. You are struggling to see the bright side. Temporary setbacks may be obscuring the truth.",
        imageKeywords: "tarot sun"
    },
    {
        name: "The Starseed",
        meaning_upright: "Hope, inspiration, and spiritual guidance. You are on the right path and are being guided by the universe. A time for healing and believing in your dreams.",
        meaning_reversed: "Despair, lack of faith, and feeling lost. You have lost sight of your guiding star. Reconnect with your spiritual purpose and find hope again.",
        imageKeywords: "tarot star"
    }
    // TODO: Add the rest of your 78 custom cards here
];
