import { useState, useEffect } from 'react';
import { Box, Grid, GridItem, Text, Button, VStack, HStack } from '@chakra-ui/react';

interface Candy {
  id: number;
  color: string;
}

const GRID_SIZE = 8;
const CANDY_COLORS = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

export const Game = () => {
  const [board, setBoard] = useState<Candy[][]>([]);
  const [score, setScore] = useState(0);
  const [selectedCandy, setSelectedCandy] = useState<{ row: number; col: number } | null>(null);

  const initializeBoard = () => {
    const newBoard: Candy[][] = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      const row: Candy[] = [];
      for (let j = 0; j < GRID_SIZE; j++) {
        row.push({
          id: i * GRID_SIZE + j,
          color: CANDY_COLORS[Math.floor(Math.random() * CANDY_COLORS.length)]
        });
      }
      newBoard.push(row);
    }
    setBoard(newBoard);
  };

  useEffect(() => {
    initializeBoard();
  }, []);

  const handleCandyClick = (row: number, col: number) => {
    if (!selectedCandy) {
      setSelectedCandy({ row, col });
    } else {
      // Check if the clicked candy is adjacent to the selected candy
      const isAdjacent =
        (Math.abs(selectedCandy.row - row) === 1 && selectedCandy.col === col) ||
        (Math.abs(selectedCandy.col - col) === 1 && selectedCandy.row === row);

      if (isAdjacent) {
        swapCandies(selectedCandy.row, selectedCandy.col, row, col);
      }
      setSelectedCandy(null);
    }
  };

  const swapCandies = (row1: number, col1: number, row2: number, col2: number) => {
    const newBoard = [...board];
    const temp = newBoard[row1][col1];
    newBoard[row1][col1] = newBoard[row2][col2];
    newBoard[row2][col2] = temp;
    setBoard(newBoard);
    checkMatches();
  };

  const checkMatches = () => {
    // Horizontal matches
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE - 2; j++) {
        if (
          board[i][j].color === board[i][j + 1].color &&
          board[i][j].color === board[i][j + 2].color
        ) {
          setScore(prev => prev + 100);
          // Remove matched candies and drop new ones
          // This is a simplified version - you'd want to add animations and proper candy dropping
        }
      }
    }

    // Vertical matches
    for (let i = 0; i < GRID_SIZE - 2; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (
          board[i][j].color === board[i + 1][j].color &&
          board[i][j].color === board[i + 2][j].color
        ) {
          setScore(prev => prev + 100);
          // Remove matched candies and drop new ones
        }
      }
    }
  };

  return (
    <VStack spacing={4} align="center" p={4}>
      <Text fontSize="2xl" fontWeight="bold">
        Score: {score}
      </Text>
      <Box
        borderWidth="2px"
        borderRadius="lg"
        p={4}
        bg="gray.100"
      >
        <Grid templateColumns={`repeat(${GRID_SIZE}, 1fr)`} gap={1}>
          {board.map((row, rowIndex) =>
            row.map((candy, colIndex) => (
              <GridItem
                key={candy.id}
                w="50px"
                h="50px"
                bg={candy.color}
                borderRadius="md"
                cursor="pointer"
                onClick={() => handleCandyClick(rowIndex, colIndex)}
                border={
                  selectedCandy?.row === rowIndex && selectedCandy?.col === colIndex
                    ? '3px solid white'
                    : undefined
                }
                _hover={{ opacity: 0.8 }}
              />
            ))
          )}
        </Grid>
      </Box>
      <Button colorScheme="blue" onClick={initializeBoard}>
        New Game
      </Button>
    </VStack>
  );
}; 