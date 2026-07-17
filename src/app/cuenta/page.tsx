"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { useAuth } from "@/lib/auth-context";

export default function PerfilPage() {
  const { user, userData, updateUserProfile } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (userData) {
      setDisplayName(userData.displayName || "");
      setPhone(userData.phone || "");
    }
  }, [userData]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await updateUserProfile({ displayName: displayName.trim(), phone: phone.trim() });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  }

  if (!user) return null;

  return (
    <FadeIn className="flex flex-col gap-10">
      <h2 className="text-xs uppercase tracking-widest text-arela-ink/50">Información personal</h2>

      <form onSubmit={handleSave} className="flex flex-col gap-12">
        <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
          <Input
            label="Nombre completo"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
          <Input
            label="Teléfono"
            placeholder="987654321"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input label="Correo electrónico" value={user.email ?? ""} disabled className="sm:col-span-2" />
        </div>

        <div className="flex items-center gap-4">
          <Button type="submit" disabled={saving}>
            {saving ? "Guardando..." : "Guardar cambios"}
          </Button>
          {saved && <span className="text-xs text-arela-rust">Guardado ✓</span>}
        </div>
      </form>
    </FadeIn>
  );
}
