import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { Camera, Permissions } from 'expo';
// import { WebBrowser } from 'expo';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.front,
  };

  askPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  render() {
    const { hasCameraPermission, type } = this.state;
    if (hasCameraPermission === null) {
      return (
        <View style={styles.containerCenter}>
          <Text style={styles.text}>
            {`Click to open the Camera\n(Please allow if it asks for permission)`}
          </Text>
          <Button
            onPress={this.askPermission}
            title="Open Camera"
            color="#008080"
          />
        </View>
      );
    }
    if (hasCameraPermission === false) {
      return (
        <View style={styles.containerCenter}>
          <Text style={styles.text}>
            {`No access to camera\nPlease allow access to camera from settings to continue`}
          </Text>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1, margin: 25, marginTop: 35 }} type={type}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity style={styles.actionBtns}>
              <Button
                onPress={() => {
                  this.setState({
                    type:
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}
                title="Flip"
                color="#64cfef"
              />
              <Button
                onPress={() => this.setState({ hasCameraPermission: null })}
                title="Cancel"
                color="#64cfef"
              />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }

  // _handleHelpPress = () => {
  //   WebBrowser.openBrowserAsync(
  //     'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes',
  //   );
  // };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerCenter: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  text: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
    fontFamily: 'Century-Gothic',
    padding: 30,
    paddingTop: 10,
    paddingBottom: 10,
  },
  actionBtns: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
});
