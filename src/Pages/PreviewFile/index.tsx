import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import PreviewProps from './Modal/props';
import Utils from '@/Utils';
import ImageViewer from 'react-native-image-zoom-viewer';
import { inject, observer } from 'mobx-react';
import { OriginalVirtualChatMsgType } from '@/Pages/Home/Model/HomeState';
import image from '@/Assets/image';

@inject('messageStore')
@observer
export default class PreviewFile extends React.Component<PreviewProps> {
  constructor(props: PreviewProps) {
    super(props);
  }

  componentDidMount() {
    let imageUrls: { url: string }[] | undefined = [];
    let showIndex: number = 0;

    this.props.messageStore?.msgDataList.forEach(
      (element: OriginalVirtualChatMsgType) => {
        if (element.type === 10002) {
          imageUrls?.push({ url: JSON.parse(element.body).url || '' });
          if (element.flowId === this.props.route.params.flowId) {
            this.props.messageStore?.changeShowImageIndex(showIndex);
          }
          showIndex++;
        }
      },
    );
    this.props.messageStore?.changeMessageImagesList(imageUrls);
  }

  componentWillUnmount() {
    this.props.messageStore?.changeMessageImagesList([]);
  }

  render(): JSX.Element {
    // this.props.route.params;
    const { messageStore } = this.props;
    return (
      <View style={styles.webView}>
        {messageStore?.messageImagesList?.length ? (
          <ImageViewer
            index={messageStore.showImageIndex}
            imageUrls={this.props.messageStore?.messageImagesList}
            enableImageZoom={true}
            failImageSource={image.chatWindow.noImage}
          />
        ) : (
          <View style={styles.loadingBox}>
            <Image
              source={image.chatWindow.loading}
              style={styles.imageLoading}
            />
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  webViewBox: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    width: Utils.screenW(),
    height: Utils.screenH(),
  },
  webView: {
    position: 'relative',
    flex: 1,
    width: Utils.screenW(),
    height: Utils.screenH(),
  },
  loadingBox: {
    position: 'absolute',
    width: Utils.screenW(),
    height: Utils.screenH(),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  imageLoading: {
    width: Utils.scaleSize(48),
    height: Utils.scaleSize(48),
  },
});
