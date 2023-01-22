import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  label: {
    margin: 12
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  },
  container: {
    flex: 1,
    marginHorizontal: 16
  },
  body: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    textAlign: 'center',
    marginVertical: 8
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  },
  cameraContainer: {
    width: '100%',
    height: '80%',
    alignSelf: 'center'
  }
});
