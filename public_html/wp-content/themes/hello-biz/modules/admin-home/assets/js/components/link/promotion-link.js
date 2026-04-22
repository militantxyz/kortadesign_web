import Stack from '@elementor/ui/Stack';
import Typography from '@elementor/ui/Typography';
import Button from '@elementor/ui/Button';
import Paper from '@elementor/ui/Paper';
import Image from '@elementor/ui/Image';
import { Feature } from '../promotions/feature';
import UpgradeIcon from '@elementor/icons/UpgradeIcon';

export const PromotionLink = (
	{
		image,
		alt,
		title,
		message,
		button,
		url,
		features,
		target = '_blank',
		width = 100,
		height = 100,
		horizontalLayout = false,
		upgrade = false,
	} ) => {
	const paperSx = horizontalLayout
		? { display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 3, gap: 4, maxWidth: 600 }
		: { p: 3 };

	const stackSx = horizontalLayout
		? { flex: 0.6, alignItems: 'center', justifyContent: 'center' }
		: { alignItems: 'center', justifyContent: 'center' };

	const featuresStackSx = horizontalLayout
		? { flex: 0.4, mt: 4 }
		: { mt: 4 };

	const startIcon = upgrade ? <UpgradeIcon /> : null;

	return (
		<Paper sx={ paperSx }>
			<Stack direction="column" sx={ stackSx }>
				<Image src={ image } alt={ alt } variant="square" sx={ { width, height } } />
				<Typography sx={ { mt: 1 } } align="center" variant="h6">{ title }</Typography>
				<Typography align="center" variant="body2" >{ message }</Typography>
				<Button startIcon={ startIcon } sx={ { mt: 2 } } color="promotion" variant="contained" href={ url } target={ target } rel="noreferrer">{ button }</Button>
			</Stack>

			{ features && (
				<Stack gap={ 1 } sx={ featuresStackSx }>
					{ features.map( ( feature, i ) => {
					return <Feature key={ i } text={ feature } />;
				} ) }
				</Stack> ) }
		</Paper>
	);
};
