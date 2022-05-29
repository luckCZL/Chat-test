export default class TopBarProps {
  goBack!: () => void;
  title!: string;
  tabBarExtraContent?: JSX.Element; // topbar上额外的元素(右侧)
}
