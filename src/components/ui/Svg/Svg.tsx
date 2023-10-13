import { concatDiverseClasses } from '../../../utils/component';
import icons from '../../../assets/icons';

import classes from './Svg.module.scss';

interface IProps {
  readonly className?: string;
  readonly style?: React.CSSProperties;
  readonly name: string;
  readonly onClick?: (event: React.MouseEvent<SVGElement>) => void;
}

const Svg: React.FC<IProps> = (props) => {
  const svgClasses = concatDiverseClasses(
    classes['container'],
    props.className
  );
  return (
    <svg
      style={props.style}
      className={svgClasses}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={'0 0 ' + icons[props.name][0]}
      dangerouslySetInnerHTML={{ __html: icons[props.name][1] ?? '' }}
      onClick={props.onClick}
    />
  );
};

export default Svg;
