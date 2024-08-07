// import React, { useState } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { Dropdown } from 'react-native-element-dropdown';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// const data = [
//   { label: 'Last 7 days', value: '1' },
//   { label: 'Last 15 days', value: '2' },
//   { label: 'Last 30 days', value: '3' },
//   { label: 'The month', value: '4' },
//   { label: 'Last month', value: '5' },
//   { label: 'Custum range', value: '6' },
// ];

// const FilterSelect = () => {
//   const [value, setValue] = useState(null);
//   const [isFocus, setIsFocus] = useState(false);

//   const renderLabel = () => {
//     if (value || isFocus) {
//       return (
//         <Text style={[styles.label, isFocus && { color: 'blue' }]}>
//           Filter Claims
//         </Text>
//       );
//     }
//     return null;
//   };

//   return (
//     <View style={styles.container}>
//       {renderLabel()}
//       <Dropdown
//         style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
//         placeholderStyle={styles.placeholderStyle}
//         selectedTextStyle={styles.selectedTextStyle}
//         inputSearchStyle={styles.inputSearchStyle}
//         iconStyle={styles.iconStyle}
//         data={data}
//         search
//         maxHeight={300}
//         labelField="label"
//         valueField="value"
//         placeholder={!isFocus ? 'Select item' : '...'}
//         searchPlaceholder="Search..."
//         value={value}
//         onFocus={() => setIsFocus(true)}
//         onBlur={() => setIsFocus(false)}
//         onChange={item => {
//           setValue(item.value);
//           setIsFocus(false);
//         }}
//         renderLeftIcon={() => (
//           <AntDesign
//             style={styles.icon}
//             color={isFocus ? 'blue' : 'black'}
//             name="Safety"
//             size={20}
//           />
//         )}
//       />
//     </View>
//   );
// };

// export default FilterSelect;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     padding: 16,
//   },
//   dropdown: {
//     height: 50,
//     borderColor: 'gray',
//     borderWidth: 0.5,
//     borderRadius: 8,
//     paddingHorizontal: 8,
//   },
//   icon: {
//     marginRight: 5,
//   },
//   label: {
//     position: 'absolute',
//     backgroundColor: 'white',
//     left: 22,
//     top: 8,
//     zIndex: 999,
//     paddingHorizontal: 8,
//     fontSize: 14,
//   },
//   placeholderStyle: {
//     fontSize: 16,
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//   },
// });
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-ui-datepicker'; // Import the date picker

const data = [
  { label: 'Last 7 days', value: '1' },
  { label: 'Last 15 days', value: '2' },
  { label: 'Last 30 days', value: '3' },
  { label: 'The month', value: '4' },
  { label: 'Last month', value: '5' },
  { label: 'Custom range', value: '6' },
];

const FilterSelect = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dates, setDates] = useState({ start: null, end: null }); 

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Filter Claims
        </Text>
      );
    }
    return null;
  };

  const handleCustomRange = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (dates) => {
    // Update state with selected start and end dates
    setDates(dates);
    setShowDatePicker(false);
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          if (item.value === '6') { // Custom range
            handleCustomRange();
          }
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? 'blue' : 'black'}
            name="Safety"
            size={20}
          />
        )}
      />
      {showDatePicker && (
        <View style={styles.datePickerContainer}>
          <DatePicker
            mode="range"
            onDateChange={handleDateChange}
            startDate={dates.start}
            endDate={dates.end}
            placeholder="Select date range"
          />
          {dates.start && dates.end && (
            <Text style={styles.dateText}>
              Start Date: {dates.start.toDateString()}
              {'\n'}
              End Date: {dates.end.toDateString()}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

export default FilterSelect;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  datePickerContainer: {
    marginTop: 16,
  },
  dateText: {
    fontSize: 16,
    marginTop: 8,
  },
});
