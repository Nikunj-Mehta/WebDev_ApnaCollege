FROM node
# We are using node as our base image which may be using something as it's base image and so on... Hence an image are built up of multiple layers.

ENV MONGO_DB_USERNAME=delta_admin \
    MONGO_DB_PWD=delta_password 
# To give environmnet variables.

# EXPOSE to give the port number.`

RUN mkdir -p delta/nodeapp
# Run this command everytime when a container is built and before a container runs

COPY . /delta/nodeapp
# Copy all in this folder and paste it inside container in a folder nodeapp which is present in delta folder. 

CMD ["node", "delta/nodeapp/index.js"]
# when the container starts only one command runs and that is this command
# The difference between a RUN and a CMD command is we can have multiple RUN commands but can have only one CMD command