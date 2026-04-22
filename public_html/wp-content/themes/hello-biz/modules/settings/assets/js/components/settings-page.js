import Box from '@elementor/ui/Box';
import Tab from '@elementor/ui/Tab';
import TabPanel from '@elementor/ui/TabPanel';
import Tabs from '@elementor/ui/Tabs';
import { __ } from '@wordpress/i18n';
import useTabs from '@elementor/ui/useTabs';
import Typography from '@elementor/ui/Typography';
import { Seo } from './seo';
import { store as noticesStore } from '@wordpress/notices';
import { useDispatch, useSelect } from '@wordpress/data';
import Snackbar from '@elementor/ui/Snackbar';
import Alert from '@elementor/ui/Alert';
import { useEffect, useState } from 'react';
import { Structure } from './structure';
import { Theme } from './theme';
import { useSettingsContext } from './use-settings-context';
import Paper from '@elementor/ui/Paper';
import { styled } from '@elementor/ui/styles';

const Notices = () => {
	const notices = useSelect(
		( select ) =>
			select( noticesStore )
				.getNotices()
				.filter( ( notice ) => 'snackbar' === notice.type ),
		[],
	);

	useEffect( () => {
		setOpen( true );
	}, [ notices ] );

	const [ open, setOpen ] = useState( true );
	const { removeNotice } = useDispatch( noticesStore );

	const onClose = () => {
		removeNotice();
		setOpen( false );
	};

	return (
		notices.map( ( notice ) => {
			const { content, id, status } = notice;

			return (
				<Snackbar
					open={ open }
					key={ id }
					autoHideDuration={ 3000 }
					onClose={ onClose }
					anchorOrigin={ { vertical: 'bottom', horizontal: 'right' } }
				>
					<Alert onClose={ onClose } severity={ status } sx={ { width: '100%' } }>
						{ content }
					</Alert>
				</Snackbar>
			);
		} )
	);
};

const StyledTab = styled( Tab )( () => ( {
	'&.Mui-selected': {
		color: '#C00BB9',
	},
} ) );

const StyledTabs = styled( Tabs )( () => ( {
	'& .MuiTabs-indicator': {
		backgroundColor: '#C00BB9',
	},
} ) );

export const SettingsPage = () => {
	const { helloPlusActive } = useSettingsContext();
	const { getTabsProps, getTabProps, getTabPanelProps } = useTabs( 'one' );

	return (
		<Paper elevation={ 1 } sx={ { px: 4, py: 3, maxWidth: 750 } }>
			<Box sx={ { width: '100%' } }>
				<Typography variant="h4" gutterBottom>
					{ __( 'Advanced theme settings', 'hello-biz' ) }
				</Typography>
				<Typography variant="body2" component="div" sx={ { mb: 4 } }>
					{ __( 'Advanced settings are available for experienced users and developers. If you\'re unsure about a setting, we recommend keeping the default option.', 'hello-biz' ) }
				</Typography>
				<Box>
					<Notices />
				</Box>
				<Box sx={ { borderBottom: 1, borderColor: 'divider' } }>
					<StyledTabs { ...getTabsProps() } aria-label="basic tabs example">
						<StyledTab label={ __( 'SEO and accessibility', 'hello-biz' ) } { ...getTabProps( 'one' ) } />
						<StyledTab label={ __( 'Structure and layout', 'hello-biz' ) } { ...getTabProps( 'two' ) } />
						{ ! helloPlusActive && <StyledTab label={ __( 'CSS and styling control', 'hello-biz' ) } { ...getTabProps( 'three' ) } /> }
					</StyledTabs>
				</Box>
				<TabPanel { ...getTabPanelProps( 'one' ) }><Seo /></TabPanel>
				<TabPanel { ...getTabPanelProps( 'two' ) }><Structure /></TabPanel>
				{ ! helloPlusActive && <TabPanel { ...getTabPanelProps( 'three' ) }><Theme /></TabPanel> }
			</Box>
		</Paper>
	);
};
