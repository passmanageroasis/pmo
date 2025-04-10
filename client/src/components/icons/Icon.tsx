import { icons, IconName } from './icons';
import { SVGProps } from 'react';

type IconProps = {
    name: IconName;
} & SVGProps<SVGSVGElement>;

export const Icon = ({ name, ...props }: IconProps) => {
    const IconComponent = icons[name];
    return <IconComponent {...props} />;
};
