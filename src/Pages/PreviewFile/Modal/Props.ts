import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/Route/types';
import { RouteProp } from '@react-navigation/native';
import MessageStore from '@/Store/modules/messageStore';
export default class PreviewFileProps {
  navigation!: StackNavigationProp<RootStackParamList, 'PreviewFile'>;
  route!: RouteProp<RootStackParamList, 'PreviewFile'>;
  fileInfo!: {
    width?: number; //图片宽度
    height?: number; // 图片盖度
    showWidth?: number; // 图片展示的框度
    showHeight?: number; // 图片展示的高度
    type?: string; //文件类型 doc，ppt
    time?: number;
    content?: string;
    size?: number; //文件的大小
    url?: string;
    progress?: number; //进度条 0-100
    name?: string; //文件名称
  };
  messageStore?: MessageStore;
}
