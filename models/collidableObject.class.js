class CollidableObject extends MovableObject {

            /**
             *  @type {boolean} - a flag to mark this instance as cooidable
             */
             collidable = true;

              /**
             *  @type {number} - how much damage can this instance cause to other DestroyableObjects
             */
             damage = 0;

                /**
             *  @type {object} - Nummerial offsets for this instances coordinates and dimensions used for collision check
             */
             offset = {
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0
             };

                /**
             *  @function canCollide to validate collison check
             * @returns {boolean} 
             */
             canCollide() {
                  
             }

}