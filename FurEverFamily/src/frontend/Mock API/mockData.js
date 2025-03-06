export const featuredPets = [
  { 
    pet_id: 1, 
    large_results_photo_url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1', 
    pet_name: 'Buddy', 
    primary_breed: 'Golden Retriever', 
    addr_city: 'New York', 
    addr_state_code: 'NY', 
    details_url: 'https://example.com/pet/1',
    age: '2 years',
    sex: 'Male',
    description: 'Friendly and energetic Golden Retriever looking for an active family.'
  },
  { 
    pet_id: 2, 
    large_results_photo_url: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8', 
    pet_name: 'Luna', 
    primary_breed: 'Siamese', 
    addr_city: 'Los Angeles', 
    addr_state_code: 'CA', 
    details_url: 'https://example.com/pet/2',
    age: '1 year',
    sex: 'Female',
    description: 'Gentle and affectionate Siamese cat who loves cuddles.'
  },
  { 
    pet_id: 3, 
    large_results_photo_url: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9', 
    pet_name: 'Max', 
    primary_breed: 'French Bulldog', 
    addr_city: 'Chicago', 
    addr_state_code: 'IL', 
    details_url: 'https://example.com/pet/3',
    age: '3 years',
    sex: 'Male',
    description: 'Playful French Bulldog with lots of personality.'
  },
];

export const featuredRecipes = [
  {
    id: 1,
    title: 'Homemade Chicken & Rice Dog Meal',
    description: 'A nutritious and delicious meal perfect for dogs of all ages',
    petType: 'Dog',
    image: 'https://images.unsplash.com/photo-1548946526-f69e2424cf45',
    difficulty: 'Easy',
    prepTime: '30 mins',
    ingredients: ['Chicken breast', 'Brown rice', 'Carrots', 'Green beans', 'Olive oil'],
    instructions: 'Cook chicken, mix with rice and vegetables...',
    nutritionalInfo: {
      protein: '26g',
      fat: '12g',
      carbs: '34g'
    }
  },
  {
    id: 2,
    title: 'Fish & Sweet Potato Cat Dinner',
    description: 'A protein-rich meal that cats will love',
    petType: 'Cat',
    image: 'https://images.unsplash.com/photo-1556480435-b7b8d1449bd4',
    difficulty: 'Medium',
    prepTime: '45 mins',
    ingredients: ['Salmon', 'Sweet potato', 'Peas', 'Fish oil', 'Taurine supplement'],
    instructions: 'Bake salmon, mash sweet potato...',
    nutritionalInfo: {
      protein: '32g',
      fat: '15g',
      carbs: '18g'
    }
  },
  {
    id: 3,
    title: 'Veggie-Rich Rabbit Food Mix',
    description: 'A balanced blend for happy, healthy rabbits',
    petType: 'Rabbit',
    image: 'https://images.unsplash.com/photo-1585672840563-f2af2ced55c9',
    difficulty: 'Easy',
    prepTime: '15 mins',
    ingredients: ['Fresh hay', 'Carrots', 'Lettuce', 'Bell peppers', 'Herbs'],
    instructions: 'Wash and chop vegetables...',
    nutritionalInfo: {
      protein: '8g',
      fat: '3g',
      carbs: '24g'
    }
  }
];

export const mockFormOptions = {
  geo_range: [
    { value: '10', label: '10 miles' },
    { value: '25', label: '25 miles' },
    { value: '50', label: '50 miles' },
    { value: '100', label: '100 miles' }
  ],
  age: [
    { value: 'baby', label: 'Baby' },
    { value: 'young', label: 'Young' },
    { value: 'adult', label: 'Adult' },
    { value: 'senior', label: 'Senior' }
  ],
  sex: [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ],
  size: [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'xlarge', label: 'Extra Large' }
  ]
};

export const mockSearchResults = [
  {
    pet_id: 1,
    pet_name: 'Buddy',
    primary_breed: 'Golden Retriever',
    secondary_breed: '',
    addr_city: 'New York',
    addr_state_code: 'NY',
    large_results_photo_url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1',
    details_url: 'https://example.com/pet/1',
    age: '2 years',
    sex: 'Male',
  },
  {
    pet_id: 2,
    pet_name: 'Luna',
    primary_breed: 'Siamese',
    secondary_breed: '',
    addr_city: 'Los Angeles',
    addr_state_code: 'CA',
    large_results_photo_url: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8',
    details_url: 'https://example.com/pet/2',
    age: '1 year',
    sex: 'Female',
  },
];

export const mockPetDetails = [
  {
    pet_id: 1,
    pet_name: 'Buddy',
    images: [
      { thumbnail_url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1' },
      { thumbnail_url: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8' }
    ],
    pet_details_url: 'https://example.com/pet/1',
    description: 'Friendly and energetic Golden Retriever looking for an active family.',
    characteristics: ['Good with children', 'Needs a yard', 'House trained']
  },
  {
    pet_id: 2,
    pet_name: 'Luna',
    images: [
      { thumbnail_url: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8' },
      { thumbnail_url: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4' }
    ],
    pet_details_url: 'https://example.com/pet/2',
    description: 'Gentle and affectionate Siamese cat who loves cuddles.',
    characteristics: ['Indoor only', 'Good with other cats', 'Quiet']
  },
];