package com.todo.controllers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.todo.model.dtos.TodoDto;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.log;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
class TodoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testGetAll() throws Exception {
        MvcResult result = mockMvc.perform(get("/todo/getAll")
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(log())
                .andExpect(status().is2xxSuccessful())
                .andReturn();
        String jsonRes = result.getResponse().getContentAsString();
        List<TodoDto> todoDtoList = objectMapper.readValue(jsonRes, new TypeReference<List<TodoDto>>() {
        });
        Assertions.assertEquals(4, todoDtoList.size());

    }

    @Test
    public void testRemoveOne() throws Exception {
        int id = 1;
        mockMvc.perform(post("/todo/delete/" + id)
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(log())
                .andExpect(status().is2xxSuccessful());
        MvcResult result = mockMvc.perform(get("/todo/getAll")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is2xxSuccessful())
                .andReturn();
        String jsonRes = result.getResponse().getContentAsString();
        List<TodoDto> todoDtoList = objectMapper.readValue(jsonRes, new TypeReference<List<TodoDto>>() {
        });
        Assertions.assertEquals(3, todoDtoList.size());
        Assertions.assertFalse(todoDtoList.stream().anyMatch(item -> item.getId() == id));
    }
}
