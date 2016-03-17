# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
	config.vm.network "private_network", ip: "192.168.33.10"

	config.vm.define "rt_14" do |web|
		web.vm.box = "http://vagrant.int.unic.com/boxes/unic-local-rt-fe2.int.unic.com.box"
	end

	config.vm.provider "virtualbox" do |web|
		web.memory = 2048
		web.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
	end
end
