import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Cell from "./Cell";

const Row = ({
  rowState,
  rowIndex,
  activeRowIndex,
  setActiveRowIndex,
  word,
  updateCellColor,
  setCellFilled,
  setRowFilled,
  setSolved,
  rowFilled,
  gameState,
  setCellValue,
  focusCell,
  cellRefs
}) => {
  const [currentWord, setCurrentWord] = useState(null);

  const compareWords = (currentWord) => {
    const newColors = [];

    for (let i = 0; i <= 4; i++) {
      if (currentWord[i] === word[i]) {
        newColors.push("#F1930D");
      } else if (word.includes(currentWord[i])) {
        newColors.push("#6860A2");
      } else newColors.push("#3C373D");
    }

    const isCorrect = newColors.every((color) => color === "#F1930D");
    if (isCorrect) {
      setSolved(rowIndex);
    }
    updateCellColor(rowIndex, newColors);
  };

  useEffect(() => {
    if (!rowFilled) {
      const rowFilled = rowState.every((cell) => cell.filled);
      if (rowFilled) {
        setRowFilled(rowIndex);
        setActiveRowIndex(rowIndex + 1);
        let word = "";
        setCurrentWord(word);
        cellRefs.current[rowIndex].forEach((cellRef,i) => {
          word += cellRef.value;
        });
        compareWords(word.toLowerCase());


      }
    }
  }, [rowState]);

  return (
    <View style={styles.row}>
      {rowState.map((cell, index) => {
        return (
          <Cell
            rowFilled={rowFilled}
            activeRowIndex={activeRowIndex}
            cellRefs = {cellRefs}
            focusCell={focusCell}
            setCellFilled={setCellFilled}
            key={index}
            color={cell.color}
            cellIndex={index}
            rowIndex={rowIndex}
            gameState={gameState}
            value={rowState[index].value}
            setCellValue={setCellValue}
          ></Cell>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 5,
    gap: 5,
    paddingHorizontal: -2,
  },
});

export default Row;
