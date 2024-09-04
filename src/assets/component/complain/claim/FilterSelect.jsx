import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CalendarPicker from 'react-native-calendar-picker';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import Ionicons from 'react-native-vector-icons/Ionicons';
const data = [
  { label: 'Last 7 days', value: '1' },
  { label: 'Last 15 days', value: '2' },
  { label: 'Last 30 days', value: '3' },
  { label: 'This month', value: '4' },
  { label: 'Last month', value: '5' },
  { label: 'One year', value: '6' },
  { label: 'Custom range', value: '7' },
];

const FilterSelect = ({ onFilterChange }) => {
  const [state, setState] = useState({
    value: null,
    isFocus: false,
    showDatePicker: false,
    dates: { start: null, end: null },
  });

  const maxDate = new Date();
  const minDate = new Date(2000, 0, 1);

  const handleDropdownChange = (item) => {
    setState((prevState) => ({
      ...prevState,
      value: item.value,
      showDatePicker: item.value === '7',
      showConfirmation: false,
      isFocus: false,
    }));
    if (item.value !== '7') {
      onFilterChange(item.value);
    }
  };

  const onDateChange = (date, type) => {
    setState((prevState) => {
      const newDates = type === 'END_DATE'
        ? { ...prevState.dates, end: date }
        : { start: date, end: null };

      return { ...prevState, dates: newDates, showConfirmation: true };
    });
  };


  const confirmSelection = () => {
    onFilterChange(7,{ value: 7, dates: state.dates });
    setState((prevState) => ({
      ...prevState,
      showDatePicker: false,
      showConfirmation: false,
    }));
  };
  const cancelSelection = () => {
    setState((prevState) => ({
      ...prevState,
      showDatePicker: false,
      showConfirmation: false,
    }));
  };
  const renderLabel = () => {
    const { value, isFocus } = state;
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'grey' }]}>
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
        style={[styles.dropdown, state.isFocus && { borderColor: 'grey' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!state.isFocus ? 'Filter Claims' : '...'}
        searchPlaceholder="Search..."
        value={state.value}
        onFocus={() => setState((prev) => ({ ...prev, isFocus: true }))}
        onBlur={() => setState((prev) => ({ ...prev, isFocus: false }))}
        onChange={handleDropdownChange}
        renderItem={(item) => (
          <View style={{ padding: 10 }}>
            <Text style={{ color: 'black', fontSize: responsiveFontSize(2) }}>
              {item.label}
            </Text>
          </View>
        )}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={state.isFocus ? 'grey' : 'grey'}
            name="Safety"
            size={20}
          />
        )}
      />
      {state.showDatePicker && (
        <View style={styles.datePickerContainer}>
          <CalendarPicker
            startFromMonday
            allowRangeSelection
            minDate={minDate}
            maxDate={maxDate}
            todayBackgroundColor="#f2e6ff"
            selectedDayColor="red"
            selectedDayTextColor="white"
            onDateChange={onDateChange}
            selectedStartDate={state.dates.start}
            selectedEndDate={state.dates.end}
          />

          {state.showConfirmation && (
            <>
              <View style={{ flexDirection: 'row', gap: 2 }}>
                <TouchableOpacity onPress={confirmSelection} style={styles.iconButton}>
                  <Ionicons name="checkmark-circle-outline" size={30} color="green" />
                </TouchableOpacity>
                <TouchableOpacity onPress={cancelSelection} style={styles.iconButton}>
                  <Ionicons name="close-circle-outline" size={30} color="red" />
                </TouchableOpacity>
              </View>
            </>
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
    height: responsiveHeight(6),
    width: responsiveWidth(90),
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: responsiveWidth(2),
    paddingHorizontal: responsiveWidth(2),
    color: 'red',
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
    fontSize: responsiveFontSize(2),
    color: 'grey',
  },
  placeholderStyle: {
    fontSize: responsiveFontSize(2),
    color: 'grey',
  },
  selectedTextStyle: {
    fontSize: responsiveFontSize(2),
    color: 'black',
  },
  iconStyle: {
    width: responsiveWidth(3),
    height: responsiveHeight(3),
    marginHorizontal: responsiveWidth(4),
    color: 'grey',
  },
  inputSearchStyle: {
    height: responsiveHeight(5),
    fontSize: responsiveFontSize(2),
    color: 'grey',
  },
  datePickerContainer: {
    marginTop: responsiveHeight(2),
  },
  dateText: {
    fontSize: responsiveFontSize(1.8),
    marginTop: responsiveHeight(1),
    color: 'black',
    fontWeight: '400',
  },
  dateText: {
    fontSize: responsiveFontSize(1.8),
    marginTop: responsiveHeight(1),
    color: 'black',
    fontWeight: '400',
  },
  confirmationContainer: {
    marginTop: responsiveHeight(2),
  },
  confirmationText: {
    fontSize: responsiveFontSize(2),
    marginBottom: responsiveHeight(1),
    fontWeight: '600',
  },
});

