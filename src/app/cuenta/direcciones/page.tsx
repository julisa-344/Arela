"use client";

import { useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth-context";
import { usersService } from "@/lib/firebase/services/users.service";
import type { UserAddress } from "@/shared/types/firebase";

const EMPTY_FORM = {
  label: "",
  fullName: "",
  phone: "",
  street: "",
  reference: "",
  district: "",
  city: "",
  postalCode: "",
  isDefault: false,
};

export default function DireccionesPage() {
  const { user, userData, refreshUserData } = useAuth();
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const addresses = userData?.addresses ?? [];

  function openNewForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormOpen(true);
  }

  function openEditForm(address: UserAddress) {
    setEditingId(address.id);
    setForm({
      label: address.label,
      fullName: address.fullName,
      phone: address.phone,
      street: address.street,
      reference: address.reference || "",
      district: address.district,
      city: address.city,
      postalCode: address.postalCode || "",
      isDefault: address.isDefault,
    });
    setFormOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      if (editingId) {
        await usersService.updateAddress(user.uid, editingId, form);
      } else {
        await usersService.addAddress(user.uid, form);
      }
      await refreshUserData();
      setFormOpen(false);
      setForm(EMPTY_FORM);
      setEditingId(null);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!user) return;
    await usersService.deleteAddress(user.uid, id);
    await refreshUserData();
  }

  return (
    <FadeIn className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xs uppercase tracking-widest text-arela-ink/50">Mis direcciones</h2>
        {!formOpen && (
          <Button size="sm" onClick={openNewForm}>
            Agregar
          </Button>
        )}
      </div>

      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 border-t border-arela-ink/10 pt-8"
        >
          <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
            <Input
              label="Etiqueta"
              placeholder="Casa, oficina..."
              value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
              required
            />
            <Input
              label="Nombre completo"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              required
            />
            <Input
              label="Teléfono"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
            <Input
              label="Distrito"
              value={form.district}
              onChange={(e) => setForm({ ...form, district: e.target.value })}
              required
            />
            <Input
              label="Ciudad"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              required
            />
            <Input
              label="Código postal (opcional)"
              value={form.postalCode}
              onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
            />
          </div>

          <Input
            label="Dirección"
            value={form.street}
            onChange={(e) => setForm({ ...form, street: e.target.value })}
            required
          />
          <Input
            label="Referencia (opcional)"
            value={form.reference}
            onChange={(e) => setForm({ ...form, reference: e.target.value })}
          />

          <label className="flex items-center gap-2 text-sm text-arela-ink/70">
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
            />
            Marcar como dirección predeterminada
          </label>

          <div className="flex gap-3">
            <Button type="submit" disabled={saving}>
              {saving ? "Guardando..." : editingId ? "Guardar cambios" : "Agregar dirección"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFormOpen(false);
                setEditingId(null);
              }}
            >
              Cancelar
            </Button>
          </div>
        </form>
      )}

      {addresses.length === 0 && !formOpen ? (
        <p className="text-sm text-arela-ink/60">Todavía no tienes direcciones guardadas.</p>
      ) : (
        <div className="flex flex-col divide-y divide-arela-ink/10 border-t border-arela-ink/10">
          {addresses.map((address) => (
            <div key={address.id} className="flex flex-col gap-2 py-8 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-arela-ink">{address.label}</span>
                  {address.isDefault && (
                    <span className="text-[10px] uppercase tracking-widest text-arela-rust">
                      Predeterminada
                    </span>
                  )}
                </div>
                <p className="text-sm text-arela-ink/70">{address.fullName}</p>
                <p className="text-sm text-arela-ink/60">
                  {address.street}
                  {address.reference && `, ${address.reference}`}
                </p>
                <p className="text-sm text-arela-ink/60">
                  {address.district}, {address.city}
                </p>
                <p className="font-price text-sm text-arela-ink/60">{address.phone}</p>
              </div>

              <div className="flex gap-4 text-xs sm:mt-1">
                <button
                  onClick={() => openEditForm(address)}
                  className="cursor-pointer text-arela-ink/60 hover:text-arela-rust hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="cursor-pointer text-arela-ink/60 hover:text-arela-rust hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </FadeIn>
  );
}
