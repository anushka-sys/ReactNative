
import { colors } from './colors';

export const shadows = {
 
  elevation: {
    none: 0,
    sm:   2,   // product cards
    md:   3,   // search bar
    lg:   5,
  },

  

  card: {
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  searchBar: {
    elevation: 3,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
};
