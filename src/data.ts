export const categories = ['CHARACTER', 'FASHION', 'COMMERCIAL', 'CINEMA'] as const;
export type Category = typeof categories[number];

export const projects: Record<Category, { id: string; title: string; client?: string; imageUrl: string }[]> = {
  CHARACTER: [
    { id: 'c1', title: 'RIMA', client: 'VOGUE', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80' },
    { id: 'c2', title: 'MIKA', client: 'DAZED', imageUrl: 'https://res.cloudinary.com/gzwpz0gx/image/upload/v1789052921/MIKA_3.jpg' },
    { id: 'c3', title: 'LUNA', client: 'I-D', imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80' },
  ],
  FASHION: [
    { id: 'f1', title: 'SPRING 24', client: 'PRADA', imageUrl: 'https://images.unsplash.com/photo-1492447166138-50c3889fccb1?auto=format&fit=crop&w=1200&q=80' },
    { id: 'f2', title: 'ECHO', client: 'BALENCIAGA', imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80' },
    { id: 'f3', title: 'VELVET', client: 'GUCCI', imageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=80' },
  ],
  COMMERCIAL: [
    { id: 'co1', title: 'AURA', client: 'APPLE', imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1200&q=80' },
    { id: 'co2', title: 'VELOCITY', client: 'NIKE', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80' },
  ],
  CINEMA: [
    { id: 'ci1', title: 'THE VOID', client: 'A24', imageUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=1200&q=80' },
    { id: 'ci2', title: 'NEON', client: 'NEON', imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80' },
  ]
};
