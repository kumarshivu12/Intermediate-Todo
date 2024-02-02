import {
  Button,
  Checkbox,
  Fab,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Popover,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import {
  CaretDoubleDown,
  FadersHorizontal,
  Funnel,
  MagnifyingGlass,
  Plus,
} from "phosphor-react";
import { useTodo } from "../Context/TodoContext";
import TaskModal from "../components/TaskModal";
import TodoItem from "../components/TodoItem";

const color = {
  All: "info",
  Ongoing: "warning",
  Overdue: "error",
  Completed: "success",
};

const HomePage = () => {
  const { todos, handleOpen } = useTodo();
  const [search, setSearch] = useState("");
  const [filterValues, setFilterValues] = useState({
    low: false,
    medium: false,
    high: false,
  });
  const [selectedTab, setSelecteTab] = useState("All");
  const [selectedOrder, setSelecteOrder] = useState("all");

  const [anchorTab, setAnchorTab] = useState(null);
  const tabOpen = Boolean(anchorTab);
  const [anchorSort, setAnchorSort] = useState(null);
  const sortOpen = Boolean(anchorSort);
  const [anchorFilter, setAnchorFilter] = useState(null);
  const filterOpen = Boolean(anchorFilter);

  const [filteredTodos, setFilteredTodos] = useState([]);

  const filterTab = () => {
    let currentTodos = todos;

    // filter tabs
    if (selectedTab === "All") {
      setFilteredTodos(currentTodos);
    } else if (selectedTab === "Ongoing") {
      const currentDate = new Date();
      currentTodos = currentTodos.filter(
        (todo) => new Date(todo.dueDate) >= currentDate
      );
      setFilteredTodos(currentTodos);
    } else if (selectedTab === "Overdue") {
      const currentDate = new Date();
      currentTodos = currentTodos.filter(
        (todo) => new Date(todo.dueDate) < currentDate
      );
      setFilteredTodos(currentTodos);
    } else {
      currentTodos = currentTodos.filter((todo) => todo.status === "completed");
      setFilteredTodos(currentTodos);
    }

    //filter search
    if (search) {
      currentTodos = currentTodos.filter((todo) =>
        todo.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredTodos(currentTodos);
    }

    //filter sort
    if (selectedOrder === "newest" || selectedOrder === "oldest") {
      currentTodos = currentTodos.sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return selectedOrder === "newest" ? dateA - dateB : dateB - dateA;
      });
      setFilteredTodos(currentTodos);
    }

    //filter values
    const entries = Object.entries(filterValues)
      .filter(([_, value]) => value === true)
      .map(([key]) => key);
    if (entries.length > 0) {
      currentTodos = currentTodos.filter((todo) =>
        entries.includes(todo.priority)
      );
      setFilteredTodos(currentTodos);
    }
  };

  const handleTabClick = (tab) => {
    setSelecteTab(tab);
    setAnchorTab(null);
  };

  const handleSortClick = (order) => {
    setSelecteOrder(order);
    setAnchorSort(null);
  };

  useEffect(() => {
    filterTab();
  }, [todos, selectedTab, search, selectedOrder, filterValues]);

  return (
    <Wrapper>
      <Stack
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        p={2}
        spacing={2}
      >
        {/* Heading  */}
        <Typography variant="h4" fontFamily={"PT serif"}>
          TODO-LIST
        </Typography>
        <Typography variant="h6" fontFamily={"PT serif"}>
          {`Welcome { User }`}
        </Typography>

        {/* Search  */}
        <Stack
          spacing={2}
          minWidth={{ xs: "100%", md: "75%", lg: "50%" }}
          sx={{ backgroundColor: "#ecedf6" }}
          p={2}
        >
          <FormControl fullWidth>
            <InputBase
              variant="standard"
              placeholder="Search todo..."
              sx={{
                borderRadius: "25px",
                backgroundColor: "white",
                padding: "10px 25px",
              }}
              endAdornment={<MagnifyingGlass />}
              onChange={(e) => setSearch(e.target.value)}
            />
          </FormControl>
        </Stack>

        {/* Filters  */}
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          spacing={2}
          minWidth={{ xs: "100%", md: "75%", lg: "50%" }}
          px={4}
        >
          <Button
            variant="contained"
            color={color[selectedTab]}
            aria-expanded={tabOpen}
            endIcon={<CaretDoubleDown />}
            onClick={(e) => setAnchorTab(e.currentTarget)}
            style={{ cursor: "pointer", width: "50%" }}
            disableElevation
            disableRipple
          >
            {selectedTab}
          </Button>
          <Menu
            id="tab-menu"
            aria-labelledby="tab-button"
            anchorEl={anchorTab}
            open={tabOpen}
            onClose={() => setAnchorTab(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            elevation={1}
            value={selectedTab}
          >
            <MenuItem onClick={() => handleTabClick("All")}>All</MenuItem>
            <MenuItem onClick={() => handleTabClick("Ongoing")}>
              Ongoing
            </MenuItem>
            <MenuItem onClick={() => handleTabClick("Overdue")}>
              Overdue
            </MenuItem>
            <MenuItem onClick={() => handleTabClick("Completed")}>
              Completed
            </MenuItem>
          </Menu>
          <Stack direction={"row"} spacing={2}>
            <IconButton
              id="demo-positioned-button"
              aria-controls={sortOpen ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={sortOpen ? "true" : undefined}
              onClick={(e) => setAnchorSort(e.currentTarget)}
            >
              <FadersHorizontal size={"24px"} />
            </IconButton>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorSort}
              open={sortOpen}
              onClose={() => setAnchorSort(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              elevation={1}
            >
              <MenuItem onClick={() => handleSortClick("newest")}>
                Newest First
              </MenuItem>
              <MenuItem onClick={() => handleSortClick("oldest")}>
                Oldest First
              </MenuItem>
            </Menu>
            <IconButton
              id="popover"
              onClick={(e) => setAnchorFilter(e.currentTarget)}
            >
              <Funnel size={"24px"} />
            </IconButton>
            <Popover
              id="popover"
              open={filterOpen}
              anchorEl={anchorFilter}
              onClose={() => setAnchorFilter(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              elevation={1}
            >
              <FormGroup sx={{ padding: "10px", borderRadius: "5px" }}>
                <FormControlLabel
                  control={<Checkbox />}
                  checked={filterValues.low}
                  onChange={(e) =>
                    setFilterValues((prevValues) => ({
                      ...prevValues,
                      low: e.target.checked,
                    }))
                  }
                  label="low"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  checked={filterValues.medium}
                  onChange={(e) =>
                    setFilterValues((prevValues) => ({
                      ...prevValues,
                      medium: e.target.checked,
                    }))
                  }
                  label="medium"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  checked={filterValues.high}
                  onChange={(e) =>
                    setFilterValues((prevValues) => ({
                      ...prevValues,
                      high: e.target.checked,
                    }))
                  }
                  label="high"
                />
              </FormGroup>
            </Popover>
          </Stack>
        </Stack>

        {/* List  */}
        <Stack
          spacing={2}
          minWidth={{ xs: "100%", md: "75%", lg: "50%" }}
          sx={{ backgroundColor: "#ecedf6" }}
          p={2}
        >
          {filteredTodos?.length > 0 ? (
            filteredTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
          ) : (
            <Typography variant="subtitle2" color="grey" textAlign={"center"}>
              No Todos...
            </Typography>
          )}
        </Stack>

        {/* FAB  */}
        <Tooltip arrow placement="left" title="Add Task">
          <Fab
            color="primary"
            aria-label="add"
            sx={{ position: "fixed", bottom: 50, right: 50 }}
            onClick={() => handleOpen()}
          >
            <Plus size={"24px"} />
          </Fab>
        </Tooltip>

        {/* Modal  */}
        <TaskModal />
      </Stack>
    </Wrapper>
  );
};

export default HomePage;
