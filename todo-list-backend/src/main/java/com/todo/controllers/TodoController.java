package com.todo.controllers;

import com.todo.model.dtos.TodoDto;
import com.todo.services.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("todo")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @GetMapping("/getAll")
    public ResponseEntity<List<TodoDto>> getAllTodos() {
        return todoService.getAllTodos();
    }

    @PostMapping("/delete/{key}")
    public void deleteTodoItem(@PathVariable Integer key) {
        todoService.deleteTodoItem(key);
    }
}
