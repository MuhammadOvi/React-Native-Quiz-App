import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  Image,
} from 'react-native';
import { Camera, Permissions, FaceDetector } from 'expo';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
// import { WebBrowser } from 'expo';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.front,
    image: null,
    faces: [],
  };

  askPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  snap = async () => {
    if (this.camera) {
      const { uri } = await this.camera.takePictureAsync();
      this.setState({ image: uri });
      const { faces } = await this.detectFaces(uri);
      this.setState({ faces });
    }
  };

  detectFaces = async imageUri => {
    const options = { mode: FaceDetector.Constants.Mode.fast };
    // eslint-disable-next-line no-return-await
    return await FaceDetector.detectFacesAsync(imageUri, options);
  };

  render() {
    const { hasCameraPermission, type, image, faces } = this.state;
    const { navigation } = this.props;

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
    return !image ? (
      <View style={{ flex: 1 }}>
        <Camera
          style={{
            height: '100%',
            maxHeight: Dimensions.get('window').width + 100,
          }}
          type={type}
          ref={ref => {
            this.camera = ref;
          }}
        />
        <View style={styles.actionBtns}>
          <Ionicons
            name="md-reverse-camera"
            size={35}
            color="#008080"
            onPress={() => {
              this.setState({
                type:
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back,
              });
            }}
          />
          <Ionicons
            name="md-radio-button-on"
            size={80}
            color="#808080"
            onPress={() => this.snap()}
          />
          <Ionicons
            name="md-close-circle"
            size={35}
            color="#ff5500"
            onPress={() => this.setState({ hasCameraPermission: null })}
          />
        </View>
      </View>
    ) : (
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: image }}
          style={{
            height: '85%',
            minHeight: Dimensions.get('window').width,
            width: '100%',
          }}
        />
        {faces.length > 0 ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              height: '15%',
            }}
          >
            <Text style={{ marginBottom: 10 }}>Hi there!</Text>
            <Button
              onPress={() => navigation.navigate('Quiz')}
              title="Proceed"
              color="#008080"
            />
          </View>
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              height: '15%',
            }}
          >
            <Text style={{ marginBottom: 10 }}>No Face Found!</Text>
            <Button
              onPress={() => this.setState({ image: null })}
              title="Retake"
              color="#ff5500"
            />
          </View>
        )}
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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
});
