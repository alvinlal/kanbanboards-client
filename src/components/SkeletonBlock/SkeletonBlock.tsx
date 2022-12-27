import styles from './SkeletonBlock.module.scss';

interface SkeletonBlockProps {
  width: string;
  height: string;
}

const SkeletonBlock: React.FC<SkeletonBlockProps> = ({ width, height }) => {
  return <div className={styles.skeleton__block} style={{ width, height }} />;
};

export default SkeletonBlock;
