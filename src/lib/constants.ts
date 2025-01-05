// Centralize constants
export const APP_NAME = 'Småland';
export const DEFAULT_AVATAR_SIZE = 'md';
export const CURRENCY_RATIOS = {
  COPPER_TO_SILVER: 10,
  SILVER_TO_GOLD: 10,
  GOLD_TO_PLATINUM: 10
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  EXPLORE: '/explore',
  PROFILE: '/profile',
  TOWN_SQUARE: '/townsquare',
  CREATE_NEXUS: '/create-nexus',
  CREATE_STORY: '/create-story',
  CREATE_PROJECT: '/create-project',
  FIND_PROJECT: '/find-project',
  MY_PROJECTS: '/my-projects',
  FIND_COMMUNITY: '/find-community',
  MY_COMMUNITIES: '/my-communities'
} as const;