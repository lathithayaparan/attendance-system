package com.example.attendance.model;

import jakarta.persistence.*;
import lombok.Data;
@Data
@Entity
@Table(name = "students")
public class Student {
    @Id
    private String id;
    private String name;
    private String Class;
    private String contact;
}
