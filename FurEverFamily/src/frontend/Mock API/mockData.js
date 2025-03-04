export const featuredPets = [
  { pet_id: 1, large_results_photo_url: 'https://via.placeholder.com/300', pet_name: 'Buddy', primary_breed: 'Golden Retriever', addr_city: 'New York', addr_state_code: 'NY', details_url: 'https://example.com/pet/1' },
  { pet_id: 2, large_results_photo_url: 'https://via.placeholder.com/300', pet_name: 'Luna', primary_breed: 'Siamese', addr_city: 'Los Angeles', addr_state_code: 'CA', details_url: 'https://example.com/pet/2' },
  { pet_id: 3, large_results_photo_url: 'https://via.placeholder.com/300', pet_name: 'Max', primary_breed: 'Bulldog', addr_city: 'Chicago', addr_state_code: 'IL', details_url: 'https://example.com/pet/3' },
];

export const featuredRecipes = [
  {
    id: 1,
    title: 'Chicken Delight',
    description: 'A tasty treat for dogs',
    petType: 'Dog',
    image: 'url-to-image',
    ingredients: ['Chicken', 'Rice', 'Carrots'],
    instructions: 'Cook chicken, mix with rice and carrots...',
  },
];

export const mockFormOptions = {
  geo_range: [
    { value: '10', label: '10 miles' },
    { value: '25', label: '25 miles' },
    { value: '50', label: '50 miles' },
  ],
  age: [
    { value: 'puppy', label: 'Puppy' },
    { value: 'adult', label: 'Adult' },
    { value: 'senior', label: 'Senior' },
  ],
  sex: [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ],
};

export const mockSearchResults = [
  {
    pet_id: 1,
    pet_name: 'Buddy',
    primary_breed: 'Golden Retriever',
    secondary_breed: '',
    addr_city: 'New York',
    addr_state_code: 'NY',
    large_results_photo_url: 'https://via.placeholder.com/300',
    details_url: 'https://example.com/pet/1',
  },
  {
    pet_id: 2,
    pet_name: 'Luna',
    primary_breed: 'Siamese',
    secondary_breed: '',
    addr_city: 'Los Angeles',
    addr_state_code: 'CA',
    large_results_photo_url: 'https://via.placeholder.com/300',
    details_url: 'https://example.com/pet/2',
  },
];

export const mockPetDetails = [
  {
    pet_id: 1,
    pet_name: 'Buddy',
    images: [{ thumbnail_url: 'https://via.placeholder.com/100' }],
    pet_details_url: 'https://example.com/pet/1',
  },
  {
    pet_id: 2,
    pet_name: 'Luna',
    images: [{ thumbnail_url: 'https://via.placeholder.com/100' }],
    pet_details_url: 'https://example.com/pet/2',
  },
];