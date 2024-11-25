package com.todo.services;

import com.todo.model.dtos.TodoDto;
import com.todo.model.entities.Todo;
import com.todo.repositories.TodoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@Service
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;
    private final TodoMapper todoMapper;


    public TodoServiceImpl(
            TodoRepository todoRepository,
            TodoMapper todoMapper) {
        this.todoRepository = todoRepository;
        this.todoMapper = todoMapper;
    }

    @Override
    public ResponseEntity<List<TodoDto>> getAllTodos() {
        List<Todo> allTodos = todoRepository.findAll();
        List<TodoDto> allTodosDto = todoMapper.toTodoDtoList(allTodos);
        return ok(allTodosDto);
    }

    @Override
    public void deleteTodoItem(Integer key) {
        todoRepository.deleteById(key);
    }
}
