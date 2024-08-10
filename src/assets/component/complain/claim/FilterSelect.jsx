import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CalendarPicker from 'react-native-calendar-picker';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
const data = [
  { label: 'Last 7 days', value: '1' },
  { label: 'Last 15 days', value: '2' },
  { label: 'Last 30 days', value: '3' },
  { label: 'This month', value: '4' },
  { label: 'Last month', value: '5' },
  { label: 'One year', value: '6' },
  { label: 'Custom range', value: '7' },
];

const FilterSelect = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dates, setDates] = useState({ start: null, end: null });

  const minDate = new Date(); 
  const maxDate = new Date(2027, 6, 3); 

  const handleCustomRange = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setDates(prevDates => ({ ...prevDates, end: date }));
      // setShowDatePicker(false);
    } else {
      setDates({ start: date, end: null });
      // setShowDatePicker(false);
    }
  };

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
        placeholder={!isFocus ? 'Filter Claims' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          if (item.value === '7') { 
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
          <CalendarPicker
            startFromMonday={true}
            allowRangeSelection={true}
            minDate={minDate}
            maxDate={maxDate}
            todayBackgroundColor="#f2e6ff"
            selectedDayColor="#7300e6"
            selectedDayTextColor="black"
            onDateChange={onDateChange}
          />
          {dates.start && (
            <Text style={styles.dateText}>
              Start Date: {dates.start.toDateString()}
              {'\n'}
              End Date: {dates.end ? dates.end.toDateString() : 'Not selected'}
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
    padding: responsiveWidth(4), 
  },
  dropdown: {
    height: responsiveHeight(7), 
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: responsiveWidth(2), 
    paddingHorizontal: responsiveWidth(2),
    color:'red'
  },
  icon: {
    marginRight: responsiveWidth(2), 
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: responsiveWidth(4), 
    top: responsiveHeight(1),
    zIndex: 999,
    paddingHorizontal: responsiveWidth(2),
    fontSize:responsiveFontSize(2), 
    color:'red'
  },
  placeholderStyle: {
    fontSize: responsiveFontSize(2),
    color:'red'
  },
  selectedTextStyle: {
    fontSize: responsiveFontSize(2),
    color:'black'
  },
  iconStyle: {
    width: responsiveWidth(5), 
    height: responsiveHeight(5), 
  },
  inputSearchStyle: {
    height: responsiveHeight(5),
    fontSize:responsiveFontSize(2), 
     color:'red'
  },
  datePickerContainer: {
    marginTop: responsiveHeight(2),
  },
  dateText: {
    fontSize:responsiveFontSize(1.8),
    marginTop: responsiveHeight(1),
    color: 'black',
    fontWeight:'400'
  },
});
