import { StyleSheet } from 'react-native';

  export default  StyleSheet.create({
      /* Column Layouts */
      column: {
        flexDirection: 'column',
      },
      columnReverse: {
        flexDirection: 'column-reverse',
      },
      colCenter: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      colVCenter: {
        flexDirection: 'column',
        alignItems: 'center',
      },
      colHCenter: {
        flexDirection: 'column',
        justifyContent: 'center',
      },
      /* Row Layouts */
      row: {
        flexDirection: 'row',
      },
      rowReverse: {
        flexDirection: 'row-reverse',
      },
      rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      rowVCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
      },
      rowHCenter: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      /* Default Layouts */
      center: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      alignItemsCenter: {
        alignItems: 'center',
      },
      alignItemsEnd: {
        alignItems: 'flex-end',
      },
      alignItemsStart: {
        alignItems: 'flex-start',
      },
      alignItemsStretch: {
        alignItems: 'stretch',
      },
      justifyContentStart: {
        justifyContent: 'flex-start',
      },
      justifyContentEnd: {
        justifyContent: 'flex-end',
      },
      justifyContentCenter: {
        justifyContent: 'center',
      },
      justifyContentAround: {
        justifyContent: 'space-around',
      },
      justifyContentBetween: {
        justifyContent: 'space-between',
      },
      scrollSpaceAround: {
        flexGrow: 1,
        justifyContent: 'space-around',
      },
      scrollSpaceBetween: {
        flexGrow: 1,
        justifyContent: 'space-between',
      },
      selfStretch: {
        alignSelf: 'stretch',
      },
      selfCenter: {
        alignSelf: 'center',
      },
      selfStart: {
        alignSelf: 'flex-start',
      },
      selfEnd: {
        alignSelf: 'flex-end',
      },

      textAlignment: {
        textAlign: 'center',
      },
      /* Sizes Layouts */
      fill: {
        flex: 1,
      },
      fullSize: {
        height: '100%',
        width: '100%',
      },
      fullWidth: {
        width: '100%',
      },
      fullHeight: {
        height: '100%',
      },
      positionAbsolute: {
        position: 'absolute',
      },
      
      buttonBorderRadiusXsmall: {
        borderRadius: 10,
      },

      buttonBorderRadius: {
        borderRadius: 16,
      },

      buttonBorderRadiusSmall: {
        borderRadius: 20,
      },
      buttonBorderRadiusMedium: {
        borderRadius: 25,
      },

      buttonBorderRadiusLarge: {
        borderRadius: 30,
      },
  
     
   
    })
  
  

 