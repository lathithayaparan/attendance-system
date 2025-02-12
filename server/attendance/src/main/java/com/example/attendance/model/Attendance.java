package com.example.attendance.model;

import jakarta.persistence.*;
import lombok.Data;
@Data
@Entity
@Table(name = "attendance")
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentId;
    private String date;
    private String status;
}
