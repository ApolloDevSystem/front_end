import React, { FC, useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  AutocompleteDropdown,
  type AutocompleteDropdownRef,
  type AutocompleteDropdownItem,
} from 'react-native-autocomplete-dropdown';

interface AutocompleteDropdownInputProps {
  label?: string;
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  suggestions: string[];
  onSelectSuggestion: (suggestion: string) => void;
}

const AutocompleteDropdownInput: FC<AutocompleteDropdownInputProps> = ({
  label,
  value,
  placeholder,
  onChangeText,
  suggestions,
  onSelectSuggestion,
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const dropdownRef = useRef<AutocompleteDropdownRef>(null);

  useEffect(() => {
    setFilteredSuggestions(suggestions);
  }, [suggestions]);

  const handleTextChange = (text: string) => {
    onChangeText(text);
    const filtered = suggestions.filter(s => 
      s.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    text.length > 0 ? dropdownRef.current?.open() : dropdownRef.current?.close();
  };

  const handleSelectItem = (item: AutocompleteDropdownItem | null) => {
    if (item?.title) {
      onSelectSuggestion(item.title);
      dropdownRef.current?.close();
    }
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <AutocompleteDropdown
        ref={dropdownRef}
        clearOnFocus={false}
        closeOnBlur={false}
        closeOnSubmit={false}
        onSelectItem={handleSelectItem}
        dataSet={filteredSuggestions.map(s => ({ id: s, title: s }))}
        textInputProps={{
          placeholder: placeholder || 'Digite...',
          value: value,
          onChangeText: handleTextChange,
          style: styles.input,
          placeholderTextColor: '#7A869A',
          onFocus: () => dropdownRef.current?.open(),
        }}
        suggestionsListMaxHeight={150}
        EmptyResultComponent={<Text style={{ padding: 10 }}>Nenhum resultado</Text>}
        showChevron={false}
        inputContainerStyle={styles.inputContainer}
        flatListProps={{
          keyboardShouldPersistTaps: 'always',
        }}
        useFilter={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    zIndex: 1,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#142952',
    fontSize: 16,
  },
  input: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#142952',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 0,
  },
});

export default AutocompleteDropdownInput;