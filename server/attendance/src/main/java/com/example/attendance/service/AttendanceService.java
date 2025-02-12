package com.example.attendance.service;

import com.example.attendance.AttendanceApplication;
import com.example.attendance.model.Attendance;
import com.example.attendance.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AttendanceService {
    @Autowired
    private AttendanceRepository attendanceRepository;
    @Autowired
    private AttendanceApplication attendanceApplication;

    public List<Attendance> getAttendanceByDate(String date) {
        return attendanceRepository.findByDate(date);
    }
}
