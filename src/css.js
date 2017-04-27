const colors = {
  yellowFictionlog: '#f1b45b',
  greenStorylog: '#4ab492',
  redError: '#ed1c24',
  yellowButton: '#f9ab21',
  grey95: '#323132',
  grey90: '#404041',
  grey80: '#58585b',
  grey70: '#6d6e70',
  grey60: '#808284',
  grey50: '#939597',
  grey40: '#a7a9ab',
  grey30: '#bbbdc0',
  grey20: '#d1d2d4',
  grey10: '#e6e7e8',
  grey5: '#f1f1f2', // border color
  white: '#fff',
  black: '#000',
  buttonUnderlayColor: '#e6e7e8',
  badge: '#ef6e37',
};

const fontFamilies = {
  bold: 'MNPaethaibystorylog-DemiBold',
  boldItalic: 'MNPaethaibystorylog-DemiBoldItalic',
  italic: 'MNPaethaibystorylog-Italic',
  medium: 'MNPaethaibystorylog-Med',
  regular: 'MNPaethaibystorylog-Regular',
  icon: 'icomoon',
};

const fontSizes = {
  headerTitle: 16,
  tabBarIcon: 30,
  t1: 8, // XS
  t2: 10, // S
  t3: 12, // M
  t4: 14, // L
  t5: 16, // XL
  t6: 18, // XXL
};

const sizes = {
  outerMargin: 15,
};

const tabBarOptions = {
  style: { backgroundColor: colors.white, height: 40, borderColor: colors.grey5, borderBottomWidth: 1, elevation: 0 },
  tabStyle: { paddingHorizontal: 0 },
  labelStyle: { top: -8, fontSize: 12, fontFamily: fontFamilies.bold, fontWeight: null },
  indicatorStyle: { backgroundColor: colors.yellowFictionlog, height: 0 },
  activeTintColor: colors.yellowFictionlog,
  inactiveTintColor: colors.grey30,
  pressColor: colors.grey10,
};

const navigationHeader = {
  style: {
    backgroundColor: colors.yellowFictionlog,
    height: 60,
    elevation: 0,
  },
  titleStyle: {
    marginTop: 0,
    top: -2,
    fontSize: fontSizes.headerTitle,
    fontFamily: fontFamilies.bold,
    fontWeight: null,
  },
  tintColor: colors.white,
};

export { colors, fontFamilies, fontSizes, navigationHeader, sizes, tabBarOptions };

export default {
  iconNavbar: {
    fontSize: 30,
    color: 'white',
    fontFamily: fontFamilies.icon,
  },
  font: {
    fontSize: fontSizes.t4,
    fontFamily: fontFamilies.regular,
    color: colors.grey50,
  },
  fontBold: {
    fontSize: fontSizes.t4,
    fontFamily: fontFamilies.bold,
    color: 'white',
  },
  textInput: {
    height: 45,
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.t4,
    color: colors.grey70,
    backgroundColor: colors.grey5,
    padding: 10,
  },
};
