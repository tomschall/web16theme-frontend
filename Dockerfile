FROM centos:7

RUN yum -y install sudo
RUN useradd -m docker && usermod -aG wheel docker 
RUN echo "docker ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
RUN yum install epel-release -y
RUN yum groupinstall "Development tools"  -y
RUN yum install libffi-devel sqlite-devel libjpeg-turbo-devel libxml2-devel readline-devel pcre-devel db4-devel zlib-devel bzip2-devel openssl-devel libxslt-devel ncurses-devel postgresql-devel zlib-devel wget -y
RUN wget https://www.python.org/ftp/python/2.7.13/Python-2.7.13.tar.xz
RUN tar xvfJ Python-2.7.13.tar.xz
WORKDIR Python-2.7.13
RUN ./configure --prefix=/opt/python2 && make && make install
RUN cd /opt/python2; wget -q https://bootstrap.pypa.io/get-pip.py; bin/python get-pip.py; bin/pip install virtualenv
RUN yum install memcached memcached-devel -y
ADD ssh /home/docker/.ssh
ADD buildout /home/docker/.buildout
ADD eggs /home/docker/eggs
RUN su -c "chown -R docker:docker /home/docker" root
RUN yum install libmemcached libmemcached-devel java-1.8.0-openjdk -y
USER docker
RUN ssh-keyscan -H -t rsa gitlab.fhnw.ch  >> ~/.ssh/known_hosts
CMD ["/bin/bash"]
