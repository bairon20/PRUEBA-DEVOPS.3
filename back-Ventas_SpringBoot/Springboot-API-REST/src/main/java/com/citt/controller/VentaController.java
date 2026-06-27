package com.citt.controller;

import com.citt.exceptions.VentaNotFoundException;
import com.citt.persistence.entity.Venta;
import com.citt.persistence.services.VentaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/v1/ventas")
public class VentaController {

    private final VentaService ventaService;

    public VentaController(VentaService ventaService) {
        this.ventaService = ventaService;
    }

    @GetMapping
    public List<Venta> getVentas() {
        return ventaService.findAllVentas();
    }

    @GetMapping("/{idVenta}")
    public Venta getVentaById(@PathVariable Long idVenta) throws VentaNotFoundException {
        return ventaService.findById(idVenta);
    }

    @PostMapping
    public Venta createVenta(@RequestBody Venta venta) {
        if (venta.getDespachoGenerado() == null) {
            venta.setDespachoGenerado(false);
        }
        return ventaService.saveVenta(venta);
    }

    @PutMapping("/{idVenta}")
    public Venta updateVenta(@PathVariable Long idVenta, @RequestBody Venta ventaUpdate) throws VentaNotFoundException {
        return ventaService.updateVenta(idVenta, ventaUpdate);
    }

    @DeleteMapping("/{idVenta}")
    public void deleteVenta(@PathVariable Long idVenta) throws VentaNotFoundException {
        ventaService.deleteVenta(idVenta);
    }
}
