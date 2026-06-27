package com.citt.persistence.services;

import com.citt.exceptions.DespachoNotFoundException;
import com.citt.persistence.entity.Despacho;
import com.citt.persistence.repository.DespachoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class DespachoServiceImpl implements DespachoService{

    @Autowired
    private DespachoRepository despachoRepository;

    @Override
    public List<Despacho> findAllDespachos() {
        return despachoRepository.findAll();
    }

    @Override
    public Despacho saveDespacho(Despacho despacho) {
        if (despacho.getEntregado() == null) {
            despacho.setEntregado(false);
        }
        if (despacho.getDespachado() == null || Boolean.TRUE.equals(despacho.getDespachado())) {
            despacho.setDespachado(false);
        }
        Despacho savedDespacho = despachoRepository.save(despacho);

        // Defensive normalization: if the current schema forces `despachado=true`
        // on insert, persist the pending state explicitly right after creation.
        if (!Boolean.TRUE.equals(savedDespacho.getEntregado()) && Boolean.TRUE.equals(savedDespacho.getDespachado())) {
            savedDespacho.setDespachado(false);
            savedDespacho = despachoRepository.save(savedDespacho);
        }

        return savedDespacho;
    }

    @Override
    public Despacho updateDespacho(Long idDespacho, Despacho despacho) throws DespachoNotFoundException {
        return despachoRepository.findById(idDespacho).map(existingDespacho -> {
            if (Objects.nonNull(despacho.getFechaDespacho())) {
                existingDespacho.setFechaDespacho(despacho.getFechaDespacho());
            }
            if (Objects.nonNull(despacho.getPatenteCamion()) && !despacho.getPatenteCamion().trim().isEmpty()) {
                existingDespacho.setPatenteCamion(despacho.getPatenteCamion());
            }
            if (despacho.getIntento() > 0 || despacho.getIntento() == 0) {
                existingDespacho.setIntento(despacho.getIntento());
            }
            if (Objects.nonNull(despacho.getIdCompra())) {
                existingDespacho.setIdCompra(despacho.getIdCompra());
            }
            if (Objects.nonNull(despacho.getDireccionCompra()) && !despacho.getDireccionCompra().trim().isEmpty()) {
                existingDespacho.setDireccionCompra(despacho.getDireccionCompra());
            }
            if (Objects.nonNull(despacho.getValorCompra())) {
                existingDespacho.setValorCompra(despacho.getValorCompra());
            }
            if (Objects.nonNull(despacho.getDespachado())) {
                existingDespacho.setDespachado(despacho.getDespachado());
            }
            if (Objects.nonNull(despacho.getEntregado())) {
                existingDespacho.setEntregado(despacho.getEntregado());
                if (Boolean.TRUE.equals(despacho.getEntregado())) {
                    existingDespacho.setDespachado(true);
                }
            }
            return despachoRepository.save(existingDespacho);
        }).orElseThrow(() -> new DespachoNotFoundException("Despacho no encontrado con ID: " + idDespacho));
    }

    @Override
    public void deleteDespacho(Long idDespacho) throws DespachoNotFoundException {
        Optional<Despacho> despacho = despachoRepository.findById(idDespacho);
        if(!despacho.isPresent()){
            throw new DespachoNotFoundException("¡No es posible eliminar! No existe despacho con el ID:" + idDespacho);
        }else {
            despachoRepository.deleteById(idDespacho);
        }
    }

    @Override
    public Despacho findById(Long idDespacho) throws DespachoNotFoundException {
        Optional<Despacho> despacho = despachoRepository.findById(idDespacho);
        if(!despacho.isPresent()) throw new DespachoNotFoundException("¡No existe despacho con el ID:" + idDespacho);
        return despacho.get();
    }
}
