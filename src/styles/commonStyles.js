import { StyleSheet } from 'react-native';
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: colors.background || '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.primary,
    fontFamily: fonts.Bold,
  },
  buttonWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginTop: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.SemiBold,
  },
  headingText: {
    fontSize: 32,
    color: colors.primary,
    fontFamily: fonts.SemiBold,
    textAlign: 'center',
    marginVertical: 20,
  },
  formContainer: {
    marginTop: 20,
  },
  textContainer: {
    marginVertical: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: fonts.Light,
    color: colors.text || '#000',
  },
});
