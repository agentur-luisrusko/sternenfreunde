const VisitContent = [
    {
        id: 'address',
        title: 'Adresse',
        content: {
            name: 'Planetarium Fritzlar',
            straße: 'Gießener Straße 77',
            city: {
                plz: '34560',
                stadt: 'Fritzlar',
            },
        }
    },
    {
        id: 'contact',
        title: 'Kontakt',
        content: {
            tel: '05622 9118896660',
            email: 'info@planetarium-fritzlar.de',
        }
    },
    {
        id: 'opening',
        title: 'Öffnungszeiten',
        content: {
            mo: 'geschlossen',
            di: 'geschlossen',
            mi: '12 bis 17 Uhr',
            do: '12 bis 17 Uhr',
            fr: '12 bis 17 Uhr',
            sa: '12 bis 20 Uhr',
            so: '12 bis 20 Uhr',
        }
    },
    {
        id: 'entries',
        title: 'Eintritt',
        content: {
            erw: '6 €',
            erm: '4 €',
            kind: '2 €',
        }
    }
]

export { VisitContent };