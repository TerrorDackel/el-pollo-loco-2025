class DrawableObject {
    x = 120; /* setzt die standard-x-position des objekts auf 120 pixel */
    y = 280; /* setzt die standard-y-position des objekts auf 280 pixel */
    height = 200; /* legt die standard-höhe des objekts auf 200 pixel fest */
    width = 100; /* legt die standard-breite des objekts auf 100 pixel fest */
    img; /* speichert das bild des objekts */

    /* legt die standard-offset-werte für kollisionen oder hitboxen fest */
    offsetTop = 40; /* gibt an, wie weit der hitbox-abstand oben vom bild ist */
    offsetBottom =
        -20; /* gibt an, wie weit der hitbox-abstand unten vom bild ist */
    offsetRight = 40; /* gibt an, wie weit der hitbox-abstand rechts vom bild ist */
    offsetLeft = 15; /* gibt an, wie weit der hitbox-abstand links vom bild ist */

    /* speichert verschiedene image-caches für wiederverwendete bilder */
    imageCacheHealth = {}; /* speichert bilder für die lebensanzeige */
    imageCacheCoins = {}; /* speichert bilder für die münzanzeige */
    imageCacheBottles = {}; /* speichert bilder für die flaschenanzeige */
    imageCache = {}; /* speichert alle geladenen bilder */
    currentImage = 0; /* gibt an, welches bild aktuell verwendet wird */

    /* lädt ein einzelnes bild für das objekt */
    loadImage(path) {
        this.img = new Image(); /* erstellt ein neues bild-objekt */
        this.img.src = path; /* lädt das bild mit dem angegebenen pfad */
    }

    /* lädt mehrere bilder für animationen und speichert sie im image-cache */
    loadImages(arr) {
        arr.forEach((path) => {
        let img = new Image(); /* erstellt ein neues bild-objekt */
        img.src = path; /* lädt das bild mit dem angegebenen pfad */
        this.imageCache[path] =
            img; /* speichert das geladene bild im image-cache */
        });
    }

    /* zeichnet einen roten rahmen um das objekt für debug-zwecke */
    rectangleThrowableObject(ctx) {
        ctx.save(); /* speichert den aktuellen zustand des canvas */
        ctx.strokeStyle = "red"; /* setzt die linienfarbe auf rot */
        ctx.lineWidth = 2; /* setzt die linienstärke */
        ctx.strokeRect(
        this.x - 5 /* verschiebt das rechteck 5px nach links für padding */,
        this.y - 5 /* verschiebt das rechteck 5px nach oben für padding */,
        this.width +
            10 /* erweitert das rechteck um 10px (5px links und 5px rechts) */,
        this.height +
            10 /* erweitert das rechteck um 10px (5px oben und 5px unten) */
        );
        ctx.restore(); /* stellt den vorherigen zustand des canvas wieder her */
    }

    drawGreenFrame(ctx) {
        ctx.save(); /* speichert den aktuellen canvas-zustand */
        ctx.strokeStyle = "green"; /* setzt die rahmenfarbe auf grün */
        ctx.lineWidth = 2; /* setzt die linienstärke */
        ctx.strokeRect(
        this.x - 5 /* verschiebt den rahmen 5 pixel nach links */,
        this.y - 5 /* verschiebt den rahmen 5 pixel nach oben */,
        this.width + 10 /* erweitert den rahmen um 10 pixel in der breite */,
        this.height + 10 /* erweitert den rahmen um 10 pixel in der höhe */
        );
        ctx.restore(); /* stellt den vorherigen canvas-zustand wieder her */
    }

    /* zeichnet das objekt auf das canvas */
    draw(ctx) {
        if (!this.img)
        return; /* falls kein bild vorhanden ist, wird nichts gezeichnet */

        ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.width,
        this.height
        ); /* zeichnet das objekt */

        if (this.debugMode) {
        this.rectangleThrowableObject(
            ctx
        ); /* zeichnet den roten rahmen für throwable objects */
        }

        if (this instanceof Coins || this instanceof Bottle) {
        /* falls das objekt eine coin oder eine flasche ist */
        this.drawGreenFrame(
            ctx
        ); /* zeichnet den grünen rahmen für coins und bottles */
        }
    }

    /* zeichnet einen blauen rahmen für bestimmte objekte wie character oder chicken */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
        ctx.beginPath();
        ctx.lineWidth = "2"; /* setzt die linienstärke des rahmens */
        ctx.strokeStyle = "blue"; /* setzt die farbe des rahmens auf blau */
        ctx.rect(
            this.x + this.offsetLeft /* verschiebt den rahmen nach rechts */,
            this.y + this.offsetTop /* verschiebt den rahmen nach unten */,
            this.width - this.offsetRight - this.offsetLeft /* passt die breite des rahmens an */,
            this.height - this.offsetBottom - this.offsetTop /* passt die höhe des rahmens an */
        );
        ctx.stroke();
        }
    }

    /* lädt bilder für die lebensanzeige */
    loadImagesHealth(arr) {
        arr.forEach((path) => {
        let img = new Image(); /* erstellt ein neues bild-objekt */
        img.src = path; /* lädt das bild */
        this.imageCacheHealth[path] =
            img; /* speichert das bild im health-cache */
        });
    }

    /* lädt bilder für die münzanzeige */
    loadImagesCoins(arr) {
        arr.forEach((path) => {
        let img = new Image(); /* erstellt ein neues bild-objekt */
        img.src = path; /* lädt das bild */
        this.imageCacheCoins[path] = img; /* speichert das bild im coins-cache */
        });
    }

    /* lädt bilder für die flaschenanzeige */
    loadImagesBottles(arr) {
        arr.forEach((path) => {
        let img = new Image(); /* erstellt ein neues bild-objekt */
        img.src = path; /* lädt das bild */
        this.imageCacheBottles[path] =
            img; /* speichert das bild im bottles-cache */
        });
    }
}
