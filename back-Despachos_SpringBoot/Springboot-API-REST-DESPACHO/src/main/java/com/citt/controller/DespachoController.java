package com.citt.controller;

import com.citt.exceptions.DespachoNotFoundException;
import com.citt.persistence.entity.Despacho;
import com.citt.persistence.services.DespachoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/v1/despachos")
public class DespachoController {

    private final DespachoService despachoService;

    public DespachoController(DespachoService despachoService) {
        this.despachoService = despachoService;
    }

    @GetMapping
    public List<Despacho> getDespachos() {
        return despachoService.findAllDespachos();
    }

    @GetMapping("/{idDespacho}")
    public Despacho getDespachoById(@PathVariable Long idDespacho) throws DespachoNotFoundException {
        return despachoService.findById(idDespacho);
    }

    @PostMapping
    public Despacho createDespacho(@RequestBody Despacho despacho) {
        if (despacho.getEntregado() == null) {
            despacho.setEntregado(false);
        }
        if (despacho.getDespachado() == null) {
            despacho.setDespachado(false);
        }
        return despachoService.saveDespacho(despacho);
    }

    @PutMapping("/{idDespacho}")
    public Despacho updateDespacho(@PathVariable Long idDespacho, @RequestBody Despacho despacho) throws DespachoNotFoundException {
        return despachoService.updateDespacho(idDespacho, despacho);
    }

    @DeleteMapping("/{idDespacho}")
    public void deleteDespacho(@PathVariable Long idDespacho) throws DespachoNotFoundException {
        despachoService.deleteDespacho(idDespacho);
    }
}
